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
import { onPreloaderDone } from '../utils/preloader-ready';

gsap.registerPlugin(ScrollTrigger);

/**
 * Port of the original `setCurtainImg()` + `animateCurtainImg()` pair from
 * js/components.js. The `.overflow__curtain` div sits on top of the image
 * at `z-index: 50` with no CSS transform of its own - the original always
 * moved it out of the way with an inline `gsap.set()` before the page ever
 * painted, and only revealed the image by wiping the curtain across it on
 * scroll. Without that JS, the curtain permanently covers the image, which
 * is why images were invisible in the converted app.
 *
 * IMPORTANT: the original `animateCurtainImg()` doesn't just reveal the
 * image - once visible, it slowly zooms the image back down from
 * `scale: 1.1` to `scale: 1` over a full second (`power4.out`), overlapped
 * with the curtain wiping away. That's where the site's signature "smooth
 * zoom" feel comes from. This directive previously only did
 * `.set(content, { autoAlpha: 1 })` and never added that zoom-down tween,
 * so images popped in already zoomed and then just sat there - no smooth
 * zoom, and hovering afterwards did nothing (it was already at 1.1).
 *
 * Hover zoom is intentionally NOT handled here - it's owned entirely by
 * `FigurePortfolioHoverDirective` on the parent `.figure-portfolio__link`.
 * (Previously both directives attached mouseenter/mouseleave to the same
 * link and both animated `.overflow__content`'s scale, fighting each other
 * on every hover - that's the other half of the "hover zoom isn't smooth"
 * bug.)
 *
 * Usage: <div class="overflow" appCurtainImage>
 *          <div class="overflow__curtain">...</div>
 *          <div class="overflow__content"><img ...></div>
 *        </div>
 */
@Directive({
  selector: '[appCurtainImage]',
  standalone: true,
})
export class CurtainImageDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollTrigger?: ScrollTrigger;
  private destroyed = false;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const host = this.host.nativeElement;
    const curtain = host.querySelector('.overflow__curtain') as HTMLElement | null;
    const content = host.querySelector('.overflow__content') as HTMLElement | null;

    if (!curtain || !content) {
      return;
    }

    // Initial hidden state - matches setCurtainImg(). This can happen
    // right away regardless of the preloader; the curtain covers the
    // image either way so there's nothing to see yet.
    gsap.set(content, { scale: 1.1, autoAlpha: 0 });
    gsap.set(curtain, { y: '-99%', x: '-100%' });

    // But don't set up the reveal trigger itself until the preloader has
    // fully finished - otherwise, for images already in/near the initial
    // viewport, this wipe animation fires immediately and plays out
    // underneath the preloader curtain where nobody sees it.
    onPreloaderDone(() => {
      if (this.destroyed) {
        return;
      }

      const trigger = (host.closest('[data-os-animation]') as HTMLElement | null) ?? host;

      // 1:1 port of animateCurtainImg(): curtain wipes across (0.3s + 0.4s),
      // the image becomes visible still at scale 1.1, then smoothly zooms
      // down to scale 1 over 1s while the curtain wipes away, overlapping
      // by 1s so both finish revealing together.
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.inOut' } })
        .to(curtain, { x: '0%', duration: 0.3 })
        .to(curtain, { y: '0%', duration: 0.4 })
        .set(content, { autoAlpha: 1 })
        .to(content, { scale: 1, duration: 1, ease: 'power4.out' })
        .to(curtain, { y: '102%', duration: 0.3 }, '-=1');

      this.scrollTrigger = ScrollTrigger.create({
        trigger,
        start: () => `top bottom-=${window.innerHeight * 0.15}`,
        animation: tl,
        once: true,
        invalidateOnRefresh: true,
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.scrollTrigger?.kill();
  }
}