# Saju Dev Portfolio — Angular Rebuild

This is the original static HTML/CSS/jQuery portfolio site rebuilt as a
properly componentized **Angular 17 (standalone components)** application.
All pages, links, images, styling, and interactive behavior from the
original site are preserved.

## Getting started

```bash
npm install
npm start        # ng serve, then open http://localhost:4200
```

Production build:

```bash
npm run build     # outputs to dist/saju-portfolio
```

## Pages / routes

| Route            | Original file       | Component                                             |
|-------------------|---------------------|--------------------------------------------------------|
| `/`               | `index.html`         | `pages/home/home.component.ts`                          |
| `/webdesign`       | `webdesign.html`     | `pages/portfolio-detail/webdesign/`                     |
| `/posterdesign`    | `posterdesign.html`  | `pages/portfolio-detail/posterdesign/`                  |
| `/logodesign`      | `logodesign.html`    | `pages/portfolio-detail/logodesign/`                    |
| `/webdev`          | `webdev.html`        | `pages/portfolio-detail/webdev/`                        |
| `**` (any other)   | `404.html`           | `pages/not-found/not-found.component.ts`                |

## Structure

```
src/app/
  app.component.ts / .html      Root shell: preloader + header + <router-outlet> + footer
  app.routes.ts                 Route table (lazy-loaded standalone pages)
  app.config.ts                 Router provider setup

  models/                       Shared TS interfaces (PortfolioItem, PortfolioOption)

  shared/
    directives/
      os-animation.directive.ts   Reveal-on-scroll (replaces GSAP ScrollTrigger fade-ins)
      counter-up.directive.ts     Count-up animation (ports the original counterAnim() 1:1)
    components/
      preloader/                  Loading curtain shown briefly on first paint
      site-header/                Sticky header + burger + fullscreen overlay nav
      site-footer/                Footer used on the home page
      portfolio-masthead/         Title/tag strip reused on every detail page
      portfolio-options/          "Focus / Tools Used / Purpose" 3-column strip
      portfolio-quote/            Big descriptive quote block
      portfolio-next-link/        "Next project" teaser link

  pages/
    home/
      home.component.ts           Composes all home page sections
      components/
        hero-intro/                Big intro headline
        portfolio-showcase/        4-project grid (data-driven, routerLink)
        stats-counter/             Years/sites/pages/posters counters
        services-slider/           "What I Do" Swiper carousel
        experience-timeline/       "Learned & Earned" timeline
        contact-section/           Contact info cards

    portfolio-detail/
      webdesign/   + ui-scroll-gallery/         Sticky-scroll UI screenshot gallery
      posterdesign/+ design-masonry-grid/       Poster image grid (CSS-columns masonry)
      logodesign/  + logo-showcase-slider/      Swiper logo carousel with dots
      webdev/      + client-logos/              Client logo grid

    not-found/                     404 page
```

## Notes on the conversion

- **Styling** — the original `css/vendor.css` and `css/main.css` are reused
  verbatim (copied into `src/assets/css`), so the visual design is
  unchanged. All images, fonts, and the CV PDF were copied into
  `src/assets/` with the same relative folder layout, so the relative
  `url(...)` references inside those CSS files keep working without edits.
- **Navigation** — internal links (`webdesign.html`, `index.html`, etc.) were
  converted to Angular `routerLink`s; external links (Behance, mailto,
  tel-style contact info) are untouched.
- **Sliders** — the "What I Do" services carousel and the Logo Design page's
  image carousel use the `swiper` npm package (the same library the
  original template already bundled through `vendor.js`/`vendor.css`),
  wired up directly in each component instead of jQuery.
- **Counters** — the `#count1..#count4` stat counters are a straight port of
  the original `counterAnim()` / `observeCounter()` functions from
  `js/components.js` into `CounterUpDirective`, including the same
  from/to/duration/suffix values (e.g. the `.8+` suffix trick on the first
  counter).
- **Scroll reveal animations** — the original site used GSAP + ScrollTrigger
  for elaborate staggered entrance timelines on almost every section. That
  is a large, purely decorative dependency to port 1:1, so it's replaced
  with a small `OsAnimationDirective` (IntersectionObserver + CSS
  transition) that gives the same "fades/slides in as you scroll" effect
  without adding GSAP as a dependency. All functional behavior (navigation,
  sliders, counters, forms, links, image galleries) is preserved exactly.
- **Poster gallery masonry** — the original used the jQuery Masonry plugin.
  It's replaced with a dependency-free CSS multi-column layout
  (`design-masonry-grid.component.css`) that produces the same staggered
  grid look.
- **Contact form / Google Map** — the original template ships markup for a
  server-side mail script (`mail.php`) and a Google Maps embed key that
  weren't actually wired into any of the 5 pages you supplied, so nothing
  had to be ported there.

## Requirements

- Node.js 18+ and npm
- Angular CLI is listed as a devDependency, so a plain `npm install` is
  enough — you don't need a global Angular CLI install to build or serve.
