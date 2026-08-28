import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { PreloaderComponent } from './shared/components/preloader/preloader.component';
import {
  HeaderVariant,
  SiteHeaderComponent,
} from './shared/components/site-header/site-header.component';
import { SiteFooterComponent } from './shared/components/site-footer/site-footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PreloaderComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  headerVariant: HeaderVariant | 'none' = 'main';
  showFooter = true;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe((data) => {
        this.headerVariant = (data['headerVariant'] as HeaderVariant | 'none') ?? 'main';
        this.showFooter = !!data['showFooter'];
      });
  }
}
