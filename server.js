import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, 'dist');
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
};

// Answer coach: proxies grading requests to Gemini so the API key stays on the server.
// Set GEMINI_API_KEY (and optionally GEMINI_MODEL) in the Railway service variables.
// gemini-3.6-flash is the model RAG_project_ENSA pins (gemini-2.0-flash was retired on 27 Aug 2026).
const COACH_MODELS = [process.env.GEMINI_MODEL, 'gemini-3.6-flash', 'gemini-2.5-flash'].filter(Boolean);
const COACH_MAX_BODY = 64 * 1024;

function handleCoach(req, res) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.writeHead(503, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'coach_not_configured' }));
    return;
  }

  let size = 0;
  const chunks = [];
  req.on('data', (chunk) => {
    size += chunk.length;
    if (size > COACH_MAX_BODY) {
      res.writeHead(413, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'payload_too_large' }));
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });
  req.on('end', async () => {
    if (res.writableEnded) return;
    let payload;
    try {
      payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'invalid_json' }));
      return;
    }
    if (typeof payload.system !== 'string' || typeof payload.user !== 'string') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'missing_fields' }));
      return;
    }

    const body = JSON.stringify({
      systemInstruction: { parts: [{ text: payload.system }] },
      contents: [{ role: 'user', parts: [{ text: payload.user }] }],
      generationConfig: { temperature: 0.2, maxOutputTokens: 2048, responseMimeType: 'application/json' },
    });

    let lastError = 'unknown';
    for (const model of COACH_MODELS) {
      try {
        const upstream = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
          { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey }, body }
        );
        if (upstream.ok) {
          const data = await upstream.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
            res.end(JSON.stringify({ text }));
            return;
          }
          lastError = 'empty_response';
        } else {
          lastError = `upstream_${upstream.status}`;
        }
      } catch (e) {
        lastError = e?.message || 'network_error';
      }
    }
    res.writeHead(502, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: lastError }));
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.split('?')[0] === '/api/coach') {
    handleCoach(req, res);
    return;
  }

  // Normalize URL path
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(DIST_DIR, reqPath);

  // Security: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // Check if file exists; if not, fallback to index.html for SPA routing
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
      fs.stat(filePath, (err2, stats2) => {
        if (err2 || !stats2.isFile()) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found - Build artifacts missing');
          return;
        }
        serveFile(req, res, filePath, stats2, true);
      });
      return;
    }

    serveFile(req, res, filePath, stats, false);
  });
});

function serveFile(req, res, filePath, stats, isSpaFallback) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const totalSize = stats.size;

  // Caching headers
  let cacheControl = 'public, max-age=3600';
  if (isSpaFallback || ext === '.html' || ext === '.json' || path.basename(filePath) === 'sw.js') {
    cacheControl = 'no-cache, no-store, must-revalidate';
  } else if (filePath.includes('/assets/')) {
    cacheControl = 'public, max-age=31536000, immutable';
  }

  // HTTP Range request handling (essential for Safari/iOS HTML5 audio & video)
  const range = req.headers.range;
  if (range && (ext === '.mp3' || ext === '.mp4' || ext === '.wav' || ext === '.webm')) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

    if (start >= totalSize || end >= totalSize) {
      res.writeHead(416, {
        'Content-Range': `bytes */${totalSize}`,
      });
      res.end();
      return;
    }

    const chunksize = end - start + 1;
    const fileStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${totalSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType,
      'Cache-Control': cacheControl,
    });
    fileStream.pipe(res);
    return;
  }

  // Standard static file response
  res.writeHead(200, {
    'Content-Type': contentType,
    'Content-Length': totalSize,
    'Accept-Ranges': 'bytes',
    'Cache-Control': cacheControl,
  });

  fs.createReadStream(filePath).pipe(res);
}

server.listen(PORT, HOST, () => {
  console.log(`Sanad Academy production server running at http://${HOST}:${PORT}`);
});
