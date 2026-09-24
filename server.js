import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { grade, CoachError, coachConfigured } from './coach/grade.js';

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

// Answer coach: POST /api/coach/grade. The Gemini key (GEMINI_API_KEY) stays on the server.
// Every call spends the key's quota, so each visitor and the whole site are rate limited.
const COACH_MAX_BODY = 32 * 1024;
const COACH_PER_IP = { limit: 30, windowMs: 10 * 60 * 1000 };
const COACH_GLOBAL = { limit: 600, windowMs: 60 * 60 * 1000 };
const coachHits = new Map();
setInterval(() => {
  const now = Date.now();
  for (const [key, times] of coachHits) {
    if (!times.some((time) => now - time < COACH_GLOBAL.windowMs)) coachHits.delete(key);
  }
}, COACH_PER_IP.windowMs).unref();

function overLimit(key, { limit, windowMs }) {
  const now = Date.now();
  const recent = (coachHits.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    coachHits.set(key, recent);
    return true;
  }
  recent.push(now);
  coachHits.set(key, recent);
  return false;
}

function sendJson(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
}

function handleCoach(req, res) {
  // Railway's proxy puts the visitor's address first in X-Forwarded-For.
  const ip = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || '').split(',')[0].trim();
  if (overLimit(`ip:${ip}`, COACH_PER_IP) || overLimit('global', COACH_GLOBAL)) {
    sendJson(res, 429, { error: 'rate_limited' });
    return;
  }

  let size = 0;
  const chunks = [];
  req.on('data', (chunk) => {
    size += chunk.length;
    if (size > COACH_MAX_BODY) {
      sendJson(res, 413, { error: 'payload_too_large' });
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
      sendJson(res, 400, { error: 'invalid_json' });
      return;
    }
    try {
      sendJson(res, 200, await grade(payload));
    } catch (error) {
      if (error instanceof CoachError) {
        sendJson(res, error.status, { error: error.code });
        return;
      }
      console.error('[coach] unexpected error', error);
      sendJson(res, 500, { error: 'internal_error' });
    }
  });
}

const server = http.createServer((req, res) => {
  if (req.url.split('?')[0] === '/api/coach/grade') {
    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'method_not_allowed' });
      return;
    }
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

  // This course has one page. Old audio and removed course URLs must be 404.
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    serveFile(req, res, filePath, stats);
  });
});

function serveFile(req, res, filePath, stats) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const totalSize = stats.size;

  // Caching headers
  let cacheControl = 'public, max-age=3600';
  if (ext === '.html' || ext === '.json' || path.basename(filePath) === 'sw.js') {
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
  console.log(`Answer coach: ${coachConfigured() ? 'Gemini key configured' : 'GEMINI_API_KEY missing or placeholder, grading disabled'}`);
});
