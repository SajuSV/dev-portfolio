import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLines, setLines, animateLines } from '../../utils/text-reveal';

gsap.registerPlugin(ScrollTrigger);

/**
 * The title + tool-tag "masthead" strip at the top of a portfolio detail page.
 *
 * Real port of `SectionMasthead` from js/components.js: the title (h1) and
 * the tag/"subtitle" (.post-meta li) both reveal word/line-by-line via
 * SplitText, staggered together, while the vertical `.section-masthead__line`
 * draws down from `scaleY: 0`.
 *
 * Still wired through ScrollTrigger (`top bottom-=15%`, fires once) since
 * this masthead sits at the very top of the page and is in view immediately,
 * so it fires right on load - not gated on the preloader finishing, since
 * that just stacks an extra wait on top of the curtain animation.
 */
@Component({
  selector: 'app-portfolio-masthead',
  standalone: true,
  imports: [],
  templateUrl: './portfolio-masthead.component.html',
  styleUrl: './portfolio-masthead.component.css',
})
export class PortfolioMastheadComponent implements AfterViewInit, OnDestroy {
  /** Named `pageTitle` (not `title`) to avoid clashing with the native
   *  HTML `title` attribute, which would otherwise trigger a browser tooltip. */
  @Input({ required: true }) pageTitle!: string;
  @Input({ required: true }) tag!: string;

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollTrigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const section = this.host.nativeElement.querySelector('.section-masthead') as HTMLElement | null;
    const heading = (section?.querySelector('h1') ?? null) as HTMLElement | null;
    const metaItems = section
      ? (Array.from(section.querySelectorAll('.post-meta li')) as HTMLElement[])
      : [];
    const headline = (section?.querySelector('.section-masthead__line') ?? null) as HTMLElement | null;

    if (!section || !heading) {
      return;
    }

    const splitHeading = splitLines(heading);
    const splitMeta = splitLines(metaItems);

    // Initial hidden state - same as the original's prepare().
    setLines(splitHeading?.words ?? null);
    setLines(splitMeta?.lines ?? null);
    if (headline) {
      gsap.set(headline, { scaleY: 0, transformOrigin: 'top center' });
    }

    const tl = gsap.timeline();

    const headingReveal = animateLines(splitHeading?.words ?? null);
    if (headingReveal) {
      tl.add(headingReveal);
    }

    const metaReveal = animateLines(splitMeta?.lines ?? null);
    if (metaReveal) {
      tl.add(metaReveal, '-=0.3');
    }

    if (headline) {
      tl.to(headline, { scaleY: 1, duration: 0.6, ease: 'expo.inOut' }, '-=0.6');
    }

    this.scrollTrigger = ScrollTrigger.create({
      trigger: section,
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
