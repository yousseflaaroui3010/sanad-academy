// Checks that every exercise shown on the page has a hidden model answer on the server,
// with the same question text. Run: npm run check:coach (Node 23.6+ reads the .ts file).
import { readFileSync } from 'node:fs';
import { EXERCISES } from '../coach/exercises.js';
import { lessons } from '../src/data/lessons.ts';

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

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`coach: ${shown.size} exercises, all with matching hidden answers`);
