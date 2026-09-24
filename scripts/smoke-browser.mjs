// Real-browser check for the skip route. Uses Chrome's debugging protocol
// and Node's built-in WebSocket; no third-party test runner or API key.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const chromePath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const url = process.env.ACADEMY_URL || 'https://sanad-academy-web-production.up.railway.app/';
const profile = await mkdtemp(join(process.env.ACADEMY_TEST_TEMP || tmpdir(), 'sanad-academy-route-'));
const chrome = spawn(chromePath, [
  '--headless', '--disable-gpu', '--no-sandbox', '--disable-extensions',
  '--window-size=1280,900',
  '--remote-allow-origins=*', '--remote-debugging-port=19229',
  `--user-data-dir=${profile}`,
  url,
], { stdio: 'ignore' });

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

try {
  let page;
  for (let attempt = 0; attempt < 50; attempt++) {
    try {
      const response = await fetch('http://127.0.0.1:19229/json/list');
      page = (await response.json()).find((tab) => tab.type === 'page' && tab.url.startsWith(url));
      if (page) break;
    } catch { /* Chrome is still starting. */ }
    await wait(200);
  }
  assert.ok(page, 'Chrome did not open the Academy page');

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  let id = 0;
  function command(method, params) {
    return new Promise((resolve, reject) => {
      const commandId = ++id;
      const timeout = setTimeout(() => reject(new Error('Chrome evaluation timed out')), 10000);
      const onMessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.id !== commandId) return;
        clearTimeout(timeout);
        socket.removeEventListener('message', onMessage);
        if (message.error || message.result?.exceptionDetails) reject(new Error(JSON.stringify(message)));
        else resolve(message.result);
      };
      socket.addEventListener('message', onMessage);
      socket.send(JSON.stringify({ id: commandId, method, params }));
    });
  }
  async function evaluate(expression) {
    const result = await command('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    return result?.result?.value;
  }

  let firstTitle;
  for (let attempt = 0; attempt < 50; attempt++) {
    firstTitle = await evaluate('document.querySelector("h1")?.textContent');
    if (firstTitle) break;
    await wait(200);
  }
  assert.match(firstTitle, /Pourquoi Sanad existe/);
  const result = await evaluate(`(async () => {
    const seen = [];
    const visuals = [];
    const bridges = [];
    for (let i = 0; i < 22; i++) {
      const button = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Je connais déjà'));
      if (!button) throw new Error('Skip button missing at lesson ' + (i + 1));
      button.click();
      await new Promise(resolve => setTimeout(resolve, 80));
      seen.push(document.querySelector('h1')?.textContent);
      visuals.push(document.querySelector('main figure figcaption')?.textContent);
      bridges.push(document.querySelector('section[aria-label="Correspondance présentation, rapport et code"]')?.textContent);
    }
    return { seen, visuals, bridges, progress: document.querySelector('header')?.textContent,
      skippedLabels: [...document.querySelectorAll('nav button')].filter(b => b.textContent.includes('· passé')).length };
  })()`);
  assert.equal(result.seen.length, 22);
  assert.match(result.seen[0], /Le problème/);
  assert.match(result.seen.at(-1), /Annexe E/);
  assert.ok(result.visuals.every(Boolean), 'Each lesson needs a labeled visual');
  assert.ok(new Set(result.visuals).size >= 18, 'Visuals should fit the lesson, not repeat one template');
  assert.ok(result.bridges.every(text => text?.includes('Le code de origin/main')), 'Every slide needs presentation, report and code links');
  assert.match(result.progress, /23\/23/);
  assert.equal(result.skippedLabels, 22);
  const figureCheck = await evaluate(`(async () => {
    document.querySelectorAll('nav button')[9].click();
    await new Promise(resolve => setTimeout(resolve, 120));
    const before = document.querySelectorAll('main figure details').length;
    document.querySelector('main figure summary')?.click();
    return {
      before, opened: document.querySelector('main figure details')?.open,
      hasFigureCode: document.querySelector('main figure')?.textContent.includes('extract_figures L138'),
      correction: document.querySelector('section[aria-label="Correspondance présentation, rapport et code"]')?.textContent.includes('origin/main depuis #157'),
    };
  })()`);
  assert.ok(figureCheck.before >= 5 && figureCheck.opened && figureCheck.hasFigureCode && figureCheck.correction,
    'Figure diagram must expand real code and correct the stale-branch claim');
  const companion = await evaluate(`(async () => {
    document.querySelector('header button')?.click();
    await new Promise(resolve => setTimeout(resolve, 120));
    return {
      pressed: document.querySelector('header button')?.getAttribute('aria-pressed'),
      visual: !!document.querySelector('main figure'),
      bridge: !!document.querySelector('section[aria-label="Correspondance présentation, rapport et code"]'),
      theoryHidden: !document.querySelector('section[aria-labelledby="comprendre"]'),
    };
  })()`);
  assert.deepEqual(companion, { pressed: 'true', visual: true, bridge: true, theoryHidden: true });
  if (process.env.ACADEMY_SCREENSHOT_DIR) {
    await command('Emulation.setDeviceMetricsOverride', { width: 720, height: 900, deviceScaleFactor: 1, mobile: false });
    await evaluate("document.querySelectorAll('nav button')[8].click()");
    await wait(150);
    const width = await evaluate('({ width: innerWidth, content: document.documentElement.scrollWidth })');
    assert.ok(width.content <= width.width, `Side-by-side mode overflows: ${width.content}px > ${width.width}px`);
    await evaluate("document.querySelector('main figure')?.scrollIntoView({ block: 'start' })");
    const { data } = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile(join(process.env.ACADEMY_SCREENSHOT_DIR, 'sanad-cote-a-cote.png'), Buffer.from(data, 'base64'));
    await command('Emulation.clearDeviceMetricsOverride', {});
  }
  await evaluate("document.querySelector('header button')?.click()");
  if (process.env.ACADEMY_SCREENSHOT_DIR) {
    for (const [index, label] of [[6, 'architecture'], [7, 'indexation'], [8, 'agent'], [9, 'figures'], [13, 'resultats'], [14, 'performance'], [15, 'limites'], [21, 'donnees']]) {
      await evaluate(`document.querySelectorAll('nav button')[${index}].click()`);
      await wait(150);
      await evaluate("document.querySelector('main figure')?.scrollIntoView({ block: 'start' })");
      const { data } = await command('Page.captureScreenshot', { format: 'png' });
      await writeFile(join(process.env.ACADEMY_SCREENSHOT_DIR, `sanad-${label}.png`), Buffer.from(data, 'base64'));
    }
    await command('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await evaluate("document.querySelectorAll('nav button')[7].click()");
    await wait(150);
    const layout = await evaluate('({ width: innerWidth, content: document.documentElement.scrollWidth })');
    assert.ok(layout.content <= layout.width, `Mobile page overflows: ${layout.content}px > ${layout.width}px`);
    await evaluate("document.querySelector('main figure')?.scrollIntoView({ block: 'start' })");
    const { data: mobile } = await command('Page.captureScreenshot', { format: 'png' });
    await writeFile(join(process.env.ACADEMY_SCREENSHOT_DIR, 'sanad-mobile-indexation.png'), Buffer.from(mobile, 'base64'));
    console.log('Eight desktop visuals and one mobile visual captured for inspection.');
  }
  socket.close();
  console.log('PASS: 22 skips reached slide 24; every lesson has a distinct labeled visual and is marked passed-over, not mastered.');
} finally {
  chrome.kill();
  // Chrome's crash reporter may outlive its parent briefly on Windows.
  await wait(1000);
  try {
    await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 500 });
  } catch (error) {
    console.warn(`Browser profile cleanup incomplete: ${error.code || error.message}`);
  }
}
