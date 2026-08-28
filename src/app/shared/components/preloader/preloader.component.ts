import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { markPreloaderDone } from '../../utils/preloader-ready';

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Port of the original GSAP `Preloader` (js/components.js): draws the logo
 * outline in with DrawSVGPlugin while the page loads, then on `window.load`
 * (or a fallback timeout) plays the `finish()` timeline - finish drawing the
 * rect, fade the logo, slide the curtain up off-screen, hide the preloader.
 * Same easing/durations as the original.
 */
@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css',
})
export class PreloaderComponent implements AfterViewInit {
  /** Matches the original bg-light / bg-white / bg-dark curtain variants */
  @Input() curtainClass = 'bg-light';
  @Input() logoText = 'Saju S V';

  @ViewChild('preloaderEl', { static: true }) preloaderEl!: ElementRef<HTMLElement>;
  @ViewChild('curtainEl', { static: true }) curtainEl!: ElementRef<HTMLElement>;
  @ViewChild('logoEl', { static: true }) logoEl!: ElementRef<HTMLElement>;
  @ViewChild('rectEl', { static: true }) rectEl!: ElementRef<SVGRectElement>;

  private readonly platformId = inject(PLATFORM_ID);
  private tl = gsap.timeline();

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const rect = this.rectEl.nativeElement;
    const curtain = this.curtainEl.nativeElement;
    const logo = this.logoEl.nativeElement;
    const preloader = this.preloaderEl.nativeElement;

    // Slow "drawing in" tween while the page's own assets load - mirrors
    // the original `load()` step.
    this.tl.fromTo(
      rect,
      { drawSVG: '0%', stroke: '#b68c70' },
      { duration: 15, drawSVG: '100%', ease: 'power1.inOut' }
    );

    let finished = false;
    const finish = () => {
      if (finished) {
        return;
      }
      finished = true;

      this.tl
        .clear()
        .to(rect, { drawSVG: '100%', duration: 2, ease: 'expo.inOut' })
        .to(logo, { autoAlpha: 0, duration: 0.3 }, '-=0.3')
        .to(
          curtain,
          { y: '-100%', duration: 1, ease: 'expo.inOut' },
          '-=0.3'
        )
        .set(preloader, { autoAlpha: 0 })
        // Only now - curtain fully lifted, preloader hidden - let
        // scroll-triggered entrance animations (like the portfolio
        // cover-image wipe) start, instead of them racing the preloader.
        .call(() => markPreloaderDone());
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
      // Fallback in case the load event is slow/unreliable - never leave
      // the curtain stuck up covering the page.
      window.setTimeout(finish, 2500);
    }
  }
}