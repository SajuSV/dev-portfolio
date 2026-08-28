import { Component } from '@angular/core';
import { PortfolioMastheadComponent } from '../../../shared/components/portfolio-masthead/portfolio-masthead.component';
import { PortfolioOptionsComponent } from '../../../shared/components/portfolio-options/portfolio-options.component';
import { PortfolioQuoteComponent } from '../../../shared/components/portfolio-quote/portfolio-quote.component';
import { PortfolioNextLinkComponent } from '../../../shared/components/portfolio-next-link/portfolio-next-link.component';
import { UiScrollGalleryComponent } from './ui-scroll-gallery/ui-scroll-gallery.component';
import { PortfolioOption } from '../../../models/portfolio-item.model';

@Component({
  selector: 'app-webdesign',
  standalone: true,
  imports: [
    PortfolioMastheadComponent,
    PortfolioOptionsComponent,
    PortfolioQuoteComponent,
    UiScrollGalleryComponent,
    PortfolioNextLinkComponent,
  ],
  templateUrl: './webdesign.component.html',
})
export class WebdesignComponent {
  readonly heroImage = 'assets/img/assets/sectionPortfolio/webdesign.webp';

  readonly options: PortfolioOption[] = [
    { label: 'Focus', value: 'Web Design' },
    { label: 'Tools Used', value: 'Figma & Photoshop' },
    { label: 'Purpose', value: 'Prototype' },
  ];

  readonly quote =
    'Homepages crafted with Figma and Photoshop, designed to deliver engaging, user-focused experiences. ' +
    'For confidentiality, secure placeholder content and logos are used; some projects are displayed fully, ' +
    'while others are in progress or developed collaboratively with the team.';
}
