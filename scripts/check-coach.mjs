// Checks that every exercise shown on the page has a hidden model answer on the server,
// with the same question text. Run: npm run check:coach (Node 23.6+ reads the .ts file).
import { readFileSync } from 'node:fs';
import { EXERCISES } from '../coach/exercises.js';
import { lessons } from '../src/data/lessons.ts';
import { PATH_EXERCISES } from '../coach/pathExercises.js';
import { DEFENSE_PATH } from '../src/data/defensePath.ts';

const first = readFileSync(new URL('../src/components/FirstLesson.tsx', import.meta.url), 'utf8');
const shown = new Map(lessons.map((lesson) => [lesson.slide, lesson.gate]));
shown.set(1, first.match(/<AnswerCoach exerciseId=\{1\}[^>]*question="([^"]*)"/)?.[1]);

const problems = [];
for (const [slide, question] of shown) {
  const exercise = EXERCISES[slide];
  if (!exercise) problems.push(`slide ${slide}: no model answer`);
  else if (exercise.prompt !== question) problems.push(`slide ${slide}: question text differs from the page`);
  else if (!exercise.modelAnswer || exercise.keyPoints.length < 2 || exercise.hints.length !== 3) problems.push(`slide ${slide}: incomplete entry`);
}
for (const slide of Object.keys(EXERCISES).map(Number)) {
  if (!shown.has(slide)) problems.push(`slide ${slide}: answer has no exercise on the page`);
}

// Defense Path gates: the same rule, keyed by gate id (src/data/defensePath.ts).
const pathShown = new Map(DEFENSE_PATH.flatMap((node) => node.gates.map((gate) => [gate.id, gate.prompt])));
for (const [id, question] of pathShown) {
  const exercise = PATH_EXERCISES[id];
  if (!exercise) problems.push(`path ${id}: no model answer`);
  else if (exercise.prompt !== question) problems.push(`path ${id}: question text differs from the page`);
  else if (!exercise.modelAnswer || exercise.keyPoints.length < 2 || exercise.hints.length !== 3) problems.push(`path ${id}: incomplete entry`);
}
for (const id of Object.keys(PATH_EXERCISES)) {
  if (!pathShown.has(id)) problems.push(`path ${id}: answer has no gate on the page`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`coach: ${shown.size} lesson exercises and ${pathShown.size} Defense Path gates, all with matching hidden answers`);
