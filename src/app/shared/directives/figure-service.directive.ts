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
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(DrawSVGPlugin, SplitText);

/**
 * Port of `FigureService` + `Circle` from js/components.js: the hover
 * behavior on each `.figure-service` card (both the services-slider cards
 * and any other `.figure-service` figure) - underline bar stretches, the
 * number fades up and out, the icon slides up, the description's split
 * lines rise into view, and the icon's circle outline draws in. On narrow
 * screens (<769px, matching the original breakpoint) everything is just
 * left visible with no hover choreography, since hover isn't a great fit
 * for touch.
 *
 * Usage: <a class="figure-service" appFigureService>...</a>
 */
@Directive({
  selector: '[appFigureService]',
  standalone: true,
})
export class FigureServiceDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private tl = gsap.timeline({ paused: true });
  private split?: SplitText;
  private onEnter = () => this.play();
  private onLeave = () => this.reverse();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const el = this.host.nativeElement;
    const icon = el.querySelector('.figure-service__icon') as HTMLElement | null;
    const headline = el.querySelector('.figure-service__headline') as HTMLElement | null;
    const number = el.querySelector('.figure-service__number') as HTMLElement | null;
    const circle = el.querySelector('.figure-service__icon .circle') as SVGElement | null;
    const text = el.querySelector('.figure-service__header p') as HTMLElement | null;

    if (circle) {
      gsap.set(circle, { drawSVG: '0%', stroke: '#b68c70' });
    }

    if (text) {
      this.split = new SplitText(text, { type: 'lines', linesClass: 'split-line' });
      gsap.set(this.split.lines, { y: '150%', autoAlpha: 0 });
    }

    if (window.innerWidth < 769) {
      gsap.set([icon, headline, this.split?.lines].filter(Boolean) as gsap.TweenTarget[], {
        autoAlpha: 1,
        y: 0,
        scaleX: 1,
      });
      return;
    }

    if (headline) {
      this.tl.to(headline, { scaleX: 2, duration: 0.6, ease: 'power4.out' }, 0);
    }
    if (circle) {
      this.tl.to(circle, { drawSVG: '100%', duration: 0.6, ease: 'power4.inOut' }, 0);
    }
    if (number) {
      this.tl.to(number, { y: -50, duration: 0.3, autoAlpha: 0 }, 0);
    }
    if (icon) {
      this.tl.to(icon, { y: -50, duration: 0.6, ease: 'power4.out' }, 0);
    }
    if (this.split?.lines.length) {
      this.tl.to(
        this.split.lines,
        { y: '0%', duration: 0.6, stagger: 0.1, autoAlpha: 1, ease: 'power4.out' },
        0
      );
    }

    el.addEventListener('mouseenter', this.onEnter);
    el.addEventListener('touchstart', this.onEnter);
    el.addEventListener('mouseleave', this.onLeave);
    el.addEventListener('touchend', this.onLeave);
  }

  private play(): void {
    this.tl.play();
  }

  private reverse(): void {
    this.tl.reverse();
  }

  ngOnDestroy(): void {
    const el = this.host.nativeElement;
    el.removeEventListener('mouseenter', this.onEnter);
    el.removeEventListener('touchstart', this.onEnter);
    el.removeEventListener('mouseleave', this.onLeave);
    el.removeEventListener('touchend', this.onLeave);
    this.tl.kill();
    this.split?.revert();
  }
}
