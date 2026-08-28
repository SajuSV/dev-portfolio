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

gsap.registerPlugin(ScrollTrigger);

/**
 * Real GSAP + ScrollTrigger port of the original `createOSScene()` reveal
 * choreography (`data-os-animation`). Fires a fade/slide-up timeline the
 * first time the host element scrolls into view, matching the trigger point
 * used across js/components.js (`top bottom-=15%vh`, `once: true`).
 *
 * NOTE: this covers the shared "reveal on scroll" behavior only. The
 * bespoke per-section choreography in the original (split-line heading
 * reveals, headline underline scaleX, curtain image wipes on the masthead
 * and fullscreen sliders) is section-specific and is not reproduced here -
 * those still need their own GSAP timelines ported component by component.
 *
 * Usage: <section data-os-animation appOsAnimation>...</section>
 */
@Directive({
  selector: '[appOsAnimation]',
  standalone: true,
})
export class OsAnimationDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private scrollTrigger?: ScrollTrigger;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.set(el, { autoAlpha: 0, y: 40 });

    const tl = gsap.timeline({ paused: true }).to(el, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
    });

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
