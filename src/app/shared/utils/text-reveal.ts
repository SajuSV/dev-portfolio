import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

/**
 * Port of the `splitLines()` / `setLines()` / `animateLines()` / `hideLines()`
 * trio from the original js/components.js. These are what actually produce
 * the "smooth" word-by-word title/subtitle reveal in the static site -
 * OsAnimationDirective only does a generic fade+slide and never reproduced
 * this, which is why converted headings just pop in instead of animating.
 *
 * Usage mirrors the original 1:1:
 *   const split = splitLines(headingEl);
 *   setLines(split?.words ?? null);        // initial hidden state
 *   animateLines(split?.words ?? null);    // reveal tween
 */
export interface LineSplit {
  words: HTMLElement[];
  lines: HTMLElement[];
  split: SplitText;
}

export function splitLines(
  target: HTMLElement | HTMLElement[] | null
): LineSplit | null {
  const targets = toArray(target);
  if (!targets.length) {
    return null;
  }

  const split = new SplitText(targets, {
    type: 'words, lines',
    linesClass: 'split-line',
    wordsClass: 'split-word',
  });

  return { words: split.words as HTMLElement[], lines: split.lines as HTMLElement[], split };
}

export function setLines(elements: HTMLElement[] | null): void {
  if (!elements?.length) {
    return;
  }

  gsap.set(elements, { y: '150%', autoAlpha: 0 });
}

export function animateLines(
  elements: HTMLElement[] | null,
  duration = 0.6,
  stagger = 0.03
): gsap.core.Tween | null {
  if (!elements?.length) {
    return null;
  }

  return gsap.to(elements, {
    y: '0%',
    duration,
    stagger,
    autoAlpha: 1,
    ease: 'power4.out',
  });
}

export function hideLines(
  elements: HTMLElement[] | null,
  duration = 0.6,
  stagger = 0.03
): gsap.core.Tween | null {
  if (!elements?.length) {
    return null;
  }

  return gsap.to(elements, {
    y: '150%',
    duration,
    stagger,
    autoAlpha: 0,
    ease: 'power4.in',
  });
}

function toArray(el: HTMLElement | HTMLElement[] | null): HTMLElement[] {
  if (!el) {
    return [];
  }
  return Array.isArray(el) ? el : [el];
}
