import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { splitLines, setLines, animateLines } from '../../../../shared/utils/text-reveal';

/**
 * Big intro headline at the top of the home page.
 *
 * Real port of `SectionIntro` from js/components.js: the whole section
 * wipes up from `scaleY: 0` (bottom-anchored), the h1 reveals word-by-word
 * via SplitText, and the "UI/UX Developer" highlight bar draws in after.
 *
 * Plays immediately on view init (not gated on the preloader) - it runs
 * while the preloader curtain is still covering the screen, so by the time
 * the curtain lifts the title is already in its revealed state and there's
 * no extra multi-second wait stacked on top of the preloader.
 */
@Component({
  selector: 'app-hero-intro',
  standalone: true,
  imports: [],
  templateUrl: './hero-intro.component.html',
  styleUrl: './hero-intro.component.css',
})
export class HeroIntroComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private tl?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const section = this.host.nativeElement.querySelector('.section-intro') as HTMLElement | null;
    const heading = (section?.querySelector('h1') ?? null) as HTMLElement | null;
    const highlight = (section?.querySelector('.highlight__bg') ?? null) as HTMLElement | null;

    if (!section || !heading) {
      return;
    }

    const splitHeading = splitLines(heading);

    // Initial hidden state - same as the original's prepare().
    setLines(splitHeading?.words ?? null);
    gsap.set(section, { scaleY: 0, transformOrigin: 'bottom center' });
    if (highlight) {
      gsap.set(highlight, { x: '-100%', y: '98%' });
    }

    this.tl = gsap.timeline().to(section, {
      scaleY: 1,
      duration: 1,
      ease: 'expo.inOut',
    });

    const wordsReveal = animateLines(splitHeading?.words ?? null);
    if (wordsReveal) {
      this.tl.add(wordsReveal, '-=0.4');
    }

    if (highlight) {
      this.tl
        .to(highlight, { x: '0%', duration: 0.6, ease: 'expo.inOut' }, '-=0.4')
        .to(highlight, { y: '0%', duration: 0.6, ease: 'expo.inOut' });
    }
  }

  ngOnDestroy(): void {
    this.tl?.kill();
  }
}
