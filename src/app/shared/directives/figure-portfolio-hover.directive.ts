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

/**
 * Port of the mouseenter/mouseleave block inside `FigurePortfolio.animate()`
 * in js/components.js - this hover was never wired up in the Angular port,
 * so hovering a homepage portfolio image did nothing.
 *
 * On hover: image scales to 1.1, the little headline bar under the title
 * pulls in to 0.8 (anchored from the right), and the h2 nudges right 10px.
 * All 0.3s, `power3.inOut` in / `power2.inOut` out, exactly like the
 * original.
 *
 * Usage: <a class="figure-portfolio__link" appFigurePortfolioHover>
 */
@Directive({
  selector: '[appFigurePortfolioHover]',
  standalone: true,
})
export class FigurePortfolioHoverDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private img: HTMLElement | null = null;
  private headline: HTMLElement | null = null;
  private heading: HTMLElement | null = null;

  private readonly onEnter = () => {
    if (this.img) {
      gsap.to(this.img, { scale: 1.1, duration: 0.3, ease: 'power3.inOut' });
    }
    if (this.headline) {
      gsap.to(this.headline, {
        scaleX: 0.8,
        duration: 0.3,
        ease: 'power3.inOut',
        transformOrigin: 'right center',
      });
    }
    if (this.heading) {
      gsap.to(this.heading, { x: 10, duration: 0.3, ease: 'power3.inOut' });
    }
  };

  private readonly onLeave = () => {
    if (this.img) {
      gsap.to(this.img, { scale: 1, duration: 0.3, ease: 'power2.inOut' });
    }
    if (this.headline) {
      gsap.to(this.headline, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power2.inOut',
        transformOrigin: 'right center',
      });
    }
    if (this.heading) {
      gsap.to(this.heading, { x: 0, duration: 0.3, ease: 'power2.inOut' });
    }
  };

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const link = this.host.nativeElement;
    this.img = link.querySelector('.overflow__content') as HTMLElement | null;
    this.headline = link.querySelector('.figure-portfolio__headline') as HTMLElement | null;
    this.heading = link.querySelector('.figure-portfolio__header h2') as HTMLElement | null;

    link.addEventListener('mouseenter', this.onEnter);
    link.addEventListener('touchstart', this.onEnter, { passive: true });
    link.addEventListener('mouseleave', this.onLeave);
    link.addEventListener('touchend', this.onLeave);
  }

  ngOnDestroy(): void {
    const link = this.host.nativeElement;
    link.removeEventListener('mouseenter', this.onEnter);
    link.removeEventListener('touchstart', this.onEnter);
    link.removeEventListener('mouseleave', this.onLeave);
    link.removeEventListener('touchend', this.onLeave);
  }
}
