// Builds the SVG for the two report/slide images. Used from a Playwright page.
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function pillWidth(text) { return Math.max(...text.split('\n').map((t) => t.length)) * 8.6 + 34; }

function pill(cx, cy, text) {
  const lines = text.split('\n');
  const w = pillWidth(text), h = lines.length > 1 ? 62 : 38;
  const tspans = lines.map((l, i) => `<tspan x="${cx}" dy="${i === 0 ? (lines.length > 1 ? -11 : 0) : 24}">${esc(l)}</tspan>`).join('');
  return { w, h, cx, cy, svg: `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#EFEFEF" stroke="#8A8A8A" stroke-width="1.3"/><text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="16">${tspans}</text>` };
}

function actor(cx, cy, r, text) {
  const lines = text.split('\n');
  const t = lines.map((l, i) => `<tspan x="${cx}" dy="${i === 0 ? (lines.length > 1 ? -9 : 0) : 22}">${esc(l)}</tspan>`).join('');
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#EFEFEF" stroke="#8A8A8A" stroke-width="1.3"/><text x="${cx}" y="${cy + 6}" text-anchor="middle" font-size="16">${t}</text>`;
}

function curve(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  return `<path d="M${x1},${y1} C${mx},${y1} ${mx - 10},${y2} ${x2},${y2}" fill="none" stroke="#6B6B6B" stroke-width="1.1"/>`;
}

function include(a, b) {
  const x1 = a.cx + a.w / 2, y1 = a.cy, x2 = b.cx - b.w / 2 - 4, y2 = b.cy;
  const lx = x1 + (x2 - x1) * 0.55, ly = y1 + (y2 - y1) * 0.55;
  return `<path d="M${x1},${y1} L${x2},${y2}" fill="none" stroke="#6B6B6B" stroke-width="1.1" stroke-dasharray="2,3" marker-end="url(#arr)"/>`
    + `<rect x="${lx - 24}" y="${ly - 13}" width="48" height="22" fill="#FAFAFA"/><text x="${lx}" y="${ly + 4}" text-anchor="middle" font-size="15">inclut</text>`;
}

export function useCaseSvg() {
  const W = 1100, H = 1180, colX = 525;
  const left = ['Se connecter', 'Choisir un espace', 'Poser une question', 'Ouvrir une source', 'Voir une figure', 'Noter une réponse', "Consulter l'historique"]
    .map((t, i) => pill(colX, 92 + i * 86, t));
  const owned = ['Créer un espace', 'Déposer des documents', 'Synchroniser', 'Lire le rapport\nde synchronisation', 'Lancer une évaluation']
    .map((t, i) => pill(colX, 748 + i * 88, t));
  const search = pill(815, 178, 'Rechercher et vérifier');
  const answer = pill(815, 350, 'Répondre ou refuser');
  const figures = pill(815, 924, 'Extraire les figures');
  const user = { x: 250, y: 610, r: 58 };
  const llm = { x: 1030, y: 640, r: 52 };
  const all = [...left, ...owned];
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Arial, Helvetica, sans-serif" fill="#1D1D1D">
  <defs><marker id="arr" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto"><path d="M0,0 L9,4.5 L0,9 z" fill="#6B6B6B"/></marker></defs>
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect x="385" y="38" width="560" height="${H - 58}" fill="#FAFAFA" stroke="#9A9A9A" stroke-width="1.3"/>
  <text x="${385 + 280}" y="62" text-anchor="middle" font-size="16" fill="#444">Sanad</text>
  <rect x="400" y="700" width="250" height="${H - 58 + 38 - 700 - 14}" rx="10" fill="none" stroke="#9A9A9A" stroke-width="1.2" stroke-dasharray="6,5"/>
  <text x="525" y="722" text-anchor="middle" font-size="14" font-style="italic" fill="#555">sur ses propres espaces</text>`;
  for (const p of all) svg += curve(user.x + user.r - 4, user.y, p.cx - p.w / 2, p.cy);
  svg += curve(answer.cx + answer.w / 2, answer.cy, llm.x - llm.r, llm.y - 12);
  svg += curve(figures.cx + figures.w / 2, figures.cy, llm.x - llm.r, llm.y + 12);
  svg += include(left[2], search) + include(left[2], answer) + include(owned[2], figures);
  for (const p of [...all, search, answer, figures]) svg += p.svg;
  svg += actor(user.x, user.y, user.r, 'Utilisateur\nconnecté');
  svg += actor(llm.x, llm.y, llm.r, 'Modèle de\nlangage');
  svg += `<text x="${user.x}" y="${user.y + user.r + 26}" text-anchor="middle" font-size="13.5" fill="#555">propriétaire des espaces</text><text x="${user.x}" y="${user.y + user.r + 44}" text-anchor="middle" font-size="13.5" fill="#555">qu'il crée ; aucun rôle</text><text x="${user.x}" y="${user.y + user.r + 62}" text-anchor="middle" font-size="13.5" fill="#555">d'administrateur</text>`;
  return svg + '</svg>';
}

export function timelineSvg() {
  const W = 1400, H = 600, x0 = 40, x1 = 1300;
  const start = Date.UTC(2026, 2, 1), end = Date.UTC(2026, 9, 3);
  const X = (y, m, d) => x0 + (Date.UTC(y, m - 1, d) - start) / (end - start) * (x1 - x0);
  const rows = [
    ['Étude : lectures, essais d’outils', [3, 1], [3, 31], '#5B6B7C'],
    ['Premiers essais de code, en local', [4, 1], [7, 19], '#2E5A87'],
    ['Lancement officiel et cadrage', [7, 20], [7, 28], '#5B6B7C'],
    ['Des documents à l’index', [7, 28], [8, 29], '#1B3A5C'],
    ['L’agent qui répond ou refuse', [8, 26], [9, 10], '#1B3A5C'],
    ['Mesure, puis version 1.0', [9, 3], [9, 12], '#1B3A5C'],
    ['Versions 1.0.1 à 3.1', [9, 12], [9, 19], '#2E5A87'],
    ['Figures', [9, 19], [9, 20], '#B87A1F'],
    ['Rapport et présentation', [9, 12], [9, 25], '#5B6B7C'],
  ];
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Arial, Helvetica, sans-serif"><rect width="${W}" height="${H}" fill="#FFFFFF"/>`;
  const months = [['mars', 3], ['avril', 4], ['mai', 5], ['juin', 6], ['juillet', 7], ['août', 8], ['septembre', 9], ['', 10]];
  for (const [name, m] of months) {
    const x = X(2026, m, 1);
    svg += `<line x1="${x}" y1="18" x2="${x}" y2="${H - 62}" stroke="#E6E8EC" stroke-width="1"/><line x1="${x}" y1="${H - 62}" x2="${x}" y2="${H - 55}" stroke="#9AA3AE"/><text x="${x + 6}" y="${H - 34}" font-size="17" fill="#5F6B78">${name}</text>`;
  }
  svg += `<line x1="${x0 - 20}" y1="${H - 62}" x2="${x1}" y2="${H - 62}" stroke="#C9D0D8"/>`;
  const rowH = 50, top = 26;
  rows.forEach(([label, [m1, d1], [m2, d2], color], i) => {
    const y = top + i * rowH, a = X(2026, m1, d1), b = Math.max(X(2026, m2, d2), a + 8);
    svg += `<rect x="${a}" y="${y}" width="${b - a}" height="26" fill="${color}"/>`;
    const right = b + 10 + label.length * 9.5 < W - 20;
    svg += `<text x="${right ? b + 10 : a - 10}" y="${y + 19}" font-size="17" fill="#26313D" text-anchor="${right ? 'start' : 'end'}">${esc(label)}</text>`;
  });
  const sx = X(2026, 9, 26), sy = top + rows.length * rowH + 13;
  svg += `<path d="M${sx},${sy - 11} L${sx + 11},${sy} L${sx},${sy + 11} L${sx - 11},${sy} z" fill="#B03A2E"/><text x="${sx - 18}" y="${sy + 6}" font-size="17" fill="#B03A2E" text-anchor="end">Soutenance, 26 septembre</text>`;
  return svg + '</svg>';
}
