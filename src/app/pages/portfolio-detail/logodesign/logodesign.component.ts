import { Component } from '@angular/core';
import { PortfolioMastheadComponent } from '../../../shared/components/portfolio-masthead/portfolio-masthead.component';
import { PortfolioOptionsComponent } from '../../../shared/components/portfolio-options/portfolio-options.component';
import { PortfolioQuoteComponent } from '../../../shared/components/portfolio-quote/portfolio-quote.component';
import { PortfolioNextLinkComponent } from '../../../shared/components/portfolio-next-link/portfolio-next-link.component';
import { LogoShowcaseSliderComponent } from './logo-showcase-slider/logo-showcase-slider.component';
import { PortfolioOption } from '../../../models/portfolio-item.model';

@Component({
  selector: 'app-logodesign',
  standalone: true,
  imports: [
    PortfolioMastheadComponent,
    PortfolioOptionsComponent,
    PortfolioQuoteComponent,
    LogoShowcaseSliderComponent,
    PortfolioNextLinkComponent,
  ],
  templateUrl: './logodesign.component.html',
})
export class LogodesignComponent {
  readonly heroImage = 'assets/img/assets/sectionPortfolio/logo.webp';

  readonly options: PortfolioOption[] = [
    { label: 'Focus', value: 'Logo Design' },
    { label: 'Tools Used', value: 'Photoshop, Illustrator' },
    { label: 'Purpose', value: 'Brand Identity' },
  ];

  readonly quote =
    'Logo designs created to visually represent brands, crafted using professional tools. ' +
    'Each piece balances creativity with strategic communication.';
}
