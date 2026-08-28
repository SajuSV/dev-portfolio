import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationStart, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

export type HeaderVariant = 'main' | 'detail';

interface NavLink {
  path: string;
  label: string;
  counter: string;
}

/**
 * Site header, ported from the two header markups used across the original
 * templates:
 *  - `variant="main"`   -> logo + burger + fullscreen overlay nav (home page)
 *  - `variant="detail"` -> a single "close" button back to the homepage
 *    (portfolio detail pages)
 *
 * Behaviour preserved from js/components.js:
 *  - sticky background once the page scrolls past the top (`stickHeader`)
 *  - burger click opens/closes the fullscreen overlay menu (`Burger`, `Header`)
 */
@Component({
  selector: 'app-site-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './site-header.component.html',
  styleUrl: './site-header.component.css',
})
export class SiteHeaderComponent implements OnInit, OnDestroy {
  @Input() variant: HeaderVariant = 'main';

  readonly navLinks: NavLink[] = [
    { path: '/', label: 'Home', counter: '01' },
    { path: '/webdesign', label: 'Web Design', counter: '02' },
    { path: '/posterdesign', label: 'Poster Design', counter: '03' },
    { path: '/logodesign', label: 'Logo Design', counter: '04' },
    { path: '/webdev', label: 'Web Development', counter: '05' },
  ];

  menuOpen = false;
  isSticky = false;

  private routerSub?: Subscription;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.menuOpen = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isSticky = window.scrollY > 1;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
