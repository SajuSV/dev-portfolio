import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLines, setLines, animateLines } from '../utils/text-reveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * Port of the title/tag/headline-bar half of `FigurePortfolio.animate()`
 * from js/components.js (the image-curtain-wipe half is handled separately
 * by `CurtainImageDirective` on the inner `.overflow` element - both use
 * the same "top bottom-=15%, once" trigger point so they read as one
 * combined reveal, same as the original's single shared timeline).
 *
 * On scroll into view: the `.figure-portfolio__headline` bar draws in from
 * `scaleX: 0` (right-anchored), while the h2 title and the small info/tag
 * label both reveal word-by-word via SplitText - exactly like the original.
 *
 * In the original, this wasn't its own independent timeline - it was
 * appended onto the *same* timeline as the image curtain-wipe
 * (`animateCurtainImg`), positioned with `'-=1'`/`'-=0.8'` offsets so the
 * title only starts drawing in once the curtain has finished covering the
 * image (~0.7s in) and finishes alongside the image's slow zoom-down.
 * Split into a separate directive/ScrollTrigger, that relative timing was
 * lost and the title fired instantly at trigger-time, 0.6s flat - which is
 * why it read as much faster/more abrupt than the image reveal next to it.
 * The delays below reproduce that same ~0.5s/0.7s offset so both halves
 * read as one coordinated reveal again.
 *
 * Usage: <div class="figure-portfolio" appFigurePortfolioReveal>
 */
@Directive({
  selector: '[appFigurePortfolioReveal]',
  standalone: true,
})
export class FigurePortfolioRevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollTrigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const el = this.host.nativeElement;
    const heading = el.querySelector('.figure-portfolio__header h2') as HTMLElement | null;
    const info = el.querySelector('.figure-portfolio__info') as HTMLElement | null;
    const headline = el.querySelector('.figure-portfolio__headline') as HTMLElement | null;

    if (!heading) {
      return;
    }

    const splitHeading = splitLines(heading);
    const splitInfo = info ? splitLines(info) : null;

    // Initial hidden state - matches the original's prepare().
    setLines(splitHeading?.words ?? null);
    setLines(splitInfo?.words ?? null);
    if (headline) {
      gsap.set(headline, { scaleX: 0, transformOrigin: 'left center' });
    }

    const tl = gsap.timeline({ paused: true });

    // Matches the curtain-wipe timing in CurtainImageDirective: the curtain
    // finishes covering the image at 0.7s, so the headline bar starts
    // drawing in right then, in sync with the image's zoom-down.
    if (headline) {
      tl.to(headline, { scaleX: 1, duration: 0.6, ease: 'power4.out' }, 0.7);
    }

    // The info/tag label leads in slightly earlier, same as the original.
    const infoReveal = animateLines(splitInfo?.words ?? null);
    if (infoReveal) {
      tl.add(infoReveal, 0.5);
    }

    const headingReveal = animateLines(splitHeading?.words ?? null);
    if (headingReveal) {
      tl.add(headingReveal, 0.5);
    }

    this.scrollTrigger = ScrollTrigger.create({
      trigger: el,
      start: () => `top bottom-=${window.innerHeight * 0.15}`,
      animation: tl,
      once: true,
      invalidateOnRefresh: true,
    });
  }

  ngOnDestroy(): void {
    this.scrollTrigger?.kill();
  }
}
