import { Component } from '@angular/core';
import { PortfolioMastheadComponent } from '../../../shared/components/portfolio-masthead/portfolio-masthead.component';
import { PortfolioOptionsComponent } from '../../../shared/components/portfolio-options/portfolio-options.component';
import { PortfolioQuoteComponent } from '../../../shared/components/portfolio-quote/portfolio-quote.component';
import { PortfolioNextLinkComponent } from '../../../shared/components/portfolio-next-link/portfolio-next-link.component';
import { DesignMasonryGridComponent } from './design-masonry-grid/design-masonry-grid.component';
import { PortfolioOption } from '../../../models/portfolio-item.model';

@Component({
  selector: 'app-posterdesign',
  standalone: true,
  imports: [
    PortfolioMastheadComponent,
    PortfolioOptionsComponent,
    PortfolioQuoteComponent,
    DesignMasonryGridComponent,
    PortfolioNextLinkComponent,
  ],
  templateUrl: './posterdesign.component.html',
})
export class PosterdesignComponent {
  readonly heroImage = 'assets/img/assets/sectionPortfolio/posters.webp';

  readonly options: PortfolioOption[] = [
    { label: 'Focus', value: 'Poster Design' },
    { label: 'Tools Used', value: 'Photoshop' },
    { label: 'Purpose', value: 'Social Media' },
  ];

  readonly quote =
    'Posters designed to meet company requirements, created independently using Photoshop. ' +
    'Each design focuses on clear communication and visual impact.';

  readonly behanceUrl = 'https://www.behance.net/devspixel';
}
