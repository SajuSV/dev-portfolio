import { Routes } from '@angular/router';

// `headerVariant` drives which flavour of <app-site-header> is shown
// (see app.component.html):
//  - 'main'   -> logo + burger + full overlay navigation (home page)
//  - 'detail' -> simple "close" button back to home (portfolio detail pages)
//  - 'none'   -> no header at all (404 page)
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    data: { headerVariant: 'main', showFooter: true },
    title: 'Saju Dev - Portfolio',
  },
  {
    path: 'webdesign',
    loadComponent: () =>
      import('./pages/portfolio-detail/webdesign/webdesign.component').then(
        (m) => m.WebdesignComponent
      ),
    data: { headerVariant: 'detail', showFooter: false },
    title: 'Web Design - Saju Dev',
  },
  {
    path: 'posterdesign',
    loadComponent: () =>
      import(
        './pages/portfolio-detail/posterdesign/posterdesign.component'
      ).then((m) => m.PosterdesignComponent),
    data: { headerVariant: 'detail', showFooter: false },
    title: 'Poster Design - Saju Dev',
  },
  {
    path: 'logodesign',
    loadComponent: () =>
      import('./pages/portfolio-detail/logodesign/logodesign.component').then(
        (m) => m.LogodesignComponent
      ),
    data: { headerVariant: 'detail', showFooter: false },
    title: 'Logo Design - Saju Dev',
  },
  {
    path: 'webdev',
    loadComponent: () =>
      import('./pages/portfolio-detail/webdev/webdev.component').then(
        (m) => m.WebdevComponent
      ),
    data: { headerVariant: 'detail', showFooter: false },
    title: 'Web Development - Saju Dev',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    data: { headerVariant: 'none', showFooter: false },
    title: 'Page Not Found - Saju Dev',
  },
];
