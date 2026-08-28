import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OsAnimationDirective } from '../../../../shared/directives/os-animation.directive';
import { FigureServiceDirective } from '../../../../shared/directives/figure-service.directive';

gsap.registerPlugin(ScrollTrigger);

interface ServiceSlide {
  number: string;
  title: string;
  description: string;
  iconClass: string;
}

/**
 * "What I Do" services carousel. Ported from the `SliderServices` /
 * `renderSliderCounter` logic in js/components.js, using the Swiper library
 * (already a dependency of the original template) instead of hand-rolled
 * jQuery + GSAP wiring.
 */
@Component({
  selector: 'app-services-slider',
  standalone: true,
  imports: [CommonModule, OsAnimationDirective, FigureServiceDirective],
  templateUrl: './services-slider.component.html',
  styleUrl: './services-slider.component.css',
})
export class ServicesSliderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl', { static: true }) swiperEl!: ElementRef<HTMLElement>;
  @ViewChild('prevArrow', { static: true }) prevArrow!: ElementRef<HTMLElement>;
  @ViewChild('nextArrow', { static: true }) nextArrow!: ElementRef<HTMLElement>;
  @ViewChild('progressFill', { static: true })
  progressFill!: ElementRef<HTMLElement>;

  readonly slides: ServiceSlide[] = [
    {
      number: '01',
      title: 'Web Design',
      description:
        'Proficient in Figma, with a strong focus on UI/UX design, usability, and user-centered solutions.',
      iconClass: 'lnr-leaf',
    },
    {
      number: '02',
      title: 'Web Development',
      description:
        'Proficient in HTML, CSS, and JavaScript, with a strong focus on responsive design and user experience.',
      iconClass: 'lnr-code',
    },
    {
      number: '03',
      title: 'Graphic Design',
      description:
        'Skilled in Photoshop with a focus on visual impact, brand identity, and creative consistency.',
      iconClass: 'lnr-highlight',
    },
    {
      number: '04',
      title: 'Wordpress Development',
      description:
        'Specialized in WordPress with Elementor, converting design concepts into clean, responsive, and brand-focused websites.',
      iconClass: 'lnr-screen',
    },
  ];

  currentIndex = 1;
  readonly total = this.slides.length;

  private swiper?: Swiper;
  private readonly platformId = inject(PLATFORM_ID);
  private scrollTrigger?: ScrollTrigger;

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    // Swiper touches the DOM directly and fires many events; running it
    // outside Angular avoids unnecessary change-detection churn, and we
    // hop back `inNgZone` only for the bits the template actually binds to.
    this.zone.runOutsideAngular(() => {
      this.swiper = new Swiper(this.swiperEl.nativeElement, {
        modules: [Navigation, Autoplay],
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        },
        breakpoints: {
          576: { slidesPerView: 2 },
          991: { slidesPerView: 3 },
          1400: { slidesPerView: 3 },
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
            this.updateProgress(swiper);
          },
          init: (swiper) => this.updateProgress(swiper),
        },
      });

      this.initCardReveal();
    });
  }

  /**
   * Port of the `.figure-service` reveal choreography from `SliderServices`
   * in js/components.js: the underline bar under each card's title scales
   * in, and the number + icon fade/slide up with a stagger, the first time
   * the slider scrolls into view.
   */
  private initCardReveal(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const target = this.swiperEl.nativeElement;
    const headlines = target.querySelectorAll<HTMLElement>('.figure-service__headline');
    const counters = target.querySelectorAll<HTMLElement>('.figure-service__number');
    const icons = target.querySelectorAll<HTMLElement>('.figure-service__icon');

    if (!headlines.length) {
      return;
    }

    gsap.set(headlines, { scaleX: 0, transformOrigin: 'center center' });
    gsap.set(counters, { y: 30, autoAlpha: 0 });
    gsap.set(icons, { y: 30, autoAlpha: 0 });

    const tl = gsap
      .timeline({ paused: true })
      .to(headlines, { scaleX: 1, duration: 0.6, stagger: 0.05, ease: 'expo.inOut' })
      .to(counters, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, '-=0.6')
      .to(icons, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.1 }, '-=0.6');

    this.scrollTrigger = ScrollTrigger.create({
      trigger: target,
      start: () => `top bottom-=${window.innerHeight * 0.15}`,
      animation: tl,
      once: true,
      invalidateOnRefresh: true,
    });
  }

  private updateProgress(swiper: Swiper): void {
    const progress = Math.min(Math.max(swiper.progress, 0), 1);
    this.progressFill.nativeElement.style.width = `${progress * 100}%`;
  }

  ngOnDestroy(): void {
    this.swiper?.destroy(true, true);
    this.scrollTrigger?.kill();
  }
}
