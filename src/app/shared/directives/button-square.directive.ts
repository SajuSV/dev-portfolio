import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

gsap.registerPlugin(DrawSVGPlugin);

/**
 * Port of the original `Button()` hover behavior in js/components.js: the
 * square outline (`.rect` inside a `.button-square`) is hidden by default
 * and draws itself in on hover/touch, then undraws on mouse-leave.
 *
 * Usage: <div class="button-square" appButtonSquare>...<rect class="rect">...</div>
 */
@Directive({
  selector: '[appButtonSquare]',
  standalone: true,
})
export class ButtonSquareDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);
  private rect: SVGElement | null = null;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.rect = this.host.nativeElement.querySelector('.rect');

    if (this.rect) {
      gsap.set(this.rect, { drawSVG: '0%', stroke: '#b68c70' });
    }
  }

  @HostListener('mouseenter')
  @HostListener('touchstart')
  onEnter(): void {
    if (!this.rect) {
      return;
    }
    gsap.to(this.rect, { drawSVG: '100%', duration: 0.6, ease: 'power4.inOut' });
  }

  @HostListener('mouseleave')
  @HostListener('touchend')
  onLeave(): void {
    if (!this.rect) {
      return;
    }
    gsap.to(this.rect, { drawSVG: '0%', duration: 0.6, ease: 'power4.inOut' });
  }

  ngOnDestroy(): void {
    if (this.rect) {
      gsap.killTweensOf(this.rect);
    }
  }
}
