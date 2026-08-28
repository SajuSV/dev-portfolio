import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Direct port of the original `counterAnim` + `observeCounter` helpers from
 * js/components.js: counts up from `start` to `end` over `duration` ms,
 * kicking off the first time the element scrolls into view, then appends
 * `suffix` to the final text (e.g. "10+", ".8+").
 *
 * Usage: <span appCounterUp [countTo]="10" [countDuration]="1500" countSuffix="+"></span>
 */
@Directive({
  selector: '[appCounterUp]',
  standalone: true,
})
export class CounterUpDirective implements AfterViewInit, OnDestroy {
  @Input() countFrom = 0;
  @Input({ required: true }) countTo!: number;
  @Input() countDuration = 1000;
  @Input() countSuffix = '';

  private readonly host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;

    if (typeof IntersectionObserver === 'undefined') {
      this.animate();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.animate();
            this.observer?.unobserve(entry.target);
          }
        }
      },
      { root: null, threshold: 0.5 }
    );

    this.observer.observe(el);
  }

  private animate(): void {
    const el = this.host.nativeElement;
    const start = this.countFrom;
    const end = this.countTo;
    const duration = this.countDuration;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (startTimestamp === null) {
        startTimestamp = timestamp;
      }
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      el.innerText = `${current}${this.countSuffix}`;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
