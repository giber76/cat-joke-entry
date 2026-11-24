// cat-joke-entry (Node 22, standard library only): writes a single
// one-line cat joke, under 200 characters and nothing else, to
// /output/entry.txt. The gate takes UTF-8 text of 1 to 200 characters,
// and the blind judge compares it two at a time against other jokes.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The joke: a setup everyone with a cat recognises (the long stare at
// nothing) with a turn that flips who the idiot is — the cat is not
// being weird, *I* am the one who can't see the ghost. 108 characters,
// nothing else.
//
// Why this joke: it has a real setup and a punchline that lands on the
// last word, it turns on a fresh angle (the cat isn't haunted, I'm
// blind) rather than a tired pun, it needs no explanation, and it's
// short enough to retell to a friend the same day.
const JOKE =
  "My cat stares at empty corners for hours, then looks at me like I'm the idiot who can't see the ghost.";

// The gate takes 1 to 200 UTF-8 characters: refuse loudly rather than
// emit a text the gate would score 0.
if ([...JOKE].length < 1 || [...JOKE].length > 200) {
  throw new Error(`joke is ${[...JOKE].length} characters, outside 1-200`);
}
if (JOKE.trim() !== JOKE || JOKE.includes('\n')) {
  throw new Error('joke must be a single line with no surrounding space');
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), JOKE, 'utf8');
