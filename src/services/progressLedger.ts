// Progress ledger for coached exercises, kept in this browser only.
export interface ExerciseRecord {
  id: string;
  attempts: number;
  passedCold: boolean; // passed on the first attempt, without hints or a reveal
  passedAfterHelp: boolean;
  overconfidentMisses: number; // confidence >= 4 on a "not yet"
  lastSeen: number;
  lastPassed: number | null;
}

const KEY = 'sanad_coach_ledger_v1';
const listeners = new Set<() => void>();

function readAll(): Record<string, ExerciseRecord> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeAll(all: Record<string, ExerciseRecord>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(all));
  } catch {
    // Storage can be unavailable (private mode); the session still works without persistence.
  }
  listeners.forEach((fn) => fn());
}

export function getRecord(id: string): ExerciseRecord | undefined {
  return readAll()[id];
}

export function getAllRecords(): Record<string, ExerciseRecord> {
  return readAll();
}

export function recordAttempt(
  id: string,
  result: { passed: boolean; attemptNumber: number; confidence: number; helped: boolean }
) {
  const all = readAll();
  const now = Date.now();
  const rec: ExerciseRecord = all[id] ?? {
    id,
    attempts: 0,
    passedCold: false,
    passedAfterHelp: false,
    overconfidentMisses: 0,
    lastSeen: now,
    lastPassed: null,
  };
  rec.attempts += 1;
  rec.lastSeen = now;
  if (result.passed) {
    rec.lastPassed = now;
    if (result.attemptNumber === 1 && !result.helped) rec.passedCold = true;
    else rec.passedAfterHelp = true;
  } else if (result.confidence >= 4) {
    rec.overconfidentMisses += 1;
  }
  all[id] = rec;
  writeAll(all);
}

export function resetLedger() {
  writeAll({});
}

export function subscribeLedger(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const DAY = 24 * 60 * 60 * 1000;

// Older, weaker exercises come up first for warm-up recall.
export function pickWarmups(candidateIds: string[], count: number): string[] {
  const all = readAll();
  const now = Date.now();
  const scored = candidateIds
    .filter((id) => all[id])
    .map((id) => {
      const r = all[id];
      const weakness = (r.passedCold ? 0 : 2) + r.overconfidentMisses * 2 + (r.lastPassed ? 0 : 3);
      const age = (now - r.lastSeen) / DAY;
      return { id, score: weakness + age * 4 };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.id);
}
