import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

/**
 * The vertical logo showcase slider on the Logo Design detail page. Ported
 * from `SliderTestimonials` in js/components.js (same Swiper-based pattern
 * as the home page services slider, but with a dot pagination + big
 * current/total counter instead of arrows + a progress bar).
 */
@Component({
  selector: 'app-logo-showcase-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-showcase-slider.component.html',
  styleUrl: './logo-showcase-slider.component.css',
})
export class LogoShowcaseSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef<HTMLElement>;
  @ViewChild('prevArrow', { static: true }) prevArrow!: ElementRef<HTMLElement>;
  @ViewChild('nextArrow', { static: true }) nextArrow!: ElementRef<HTMLElement>;

  readonly images = ['logo1', 'logo2', 'logo3', 'logo4'].map(
    (name) => `assets/img/assets/sectionPortfolio/${name}.webp`
  );

  currentIndex = 1;
  readonly total = this.images.length;
  readonly dots = Array.from({ length: this.images.length });

  private swiper?: Swiper;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.swiper = new Swiper(this.swiperEl.nativeElement, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        speed: 800,
        autoHeight: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          prevEl: this.prevArrow.nativeElement,
          nextEl: this.nextArrow.nativeElement,
        },
        on: {
          slideChange: (swiper) => {
            this.zone.run(() => {
              this.currentIndex = swiper.realIndex + 1;
            });
          },
        },
      });
    });
  }

  goTo(index: number): void {
    this.swiper?.slideTo(index);
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
  }
}
