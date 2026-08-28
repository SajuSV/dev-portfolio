import { Component } from '@angular/core';
import { PortfolioMastheadComponent } from '../../../shared/components/portfolio-masthead/portfolio-masthead.component';
import { PortfolioOptionsComponent } from '../../../shared/components/portfolio-options/portfolio-options.component';
import { PortfolioQuoteComponent } from '../../../shared/components/portfolio-quote/portfolio-quote.component';
import { PortfolioNextLinkComponent } from '../../../shared/components/portfolio-next-link/portfolio-next-link.component';
import { ClientLogosComponent } from './client-logos/client-logos.component';
import { PortfolioOption } from '../../../models/portfolio-item.model';

@Component({
  selector: 'app-webdev',
  standalone: true,
  imports: [
    PortfolioMastheadComponent,
    PortfolioOptionsComponent,
    PortfolioQuoteComponent,
    ClientLogosComponent,
    PortfolioNextLinkComponent,
  ],
  templateUrl: './webdev.component.html',
})
export class WebdevComponent {
  readonly heroImage = 'assets/img/assets/sectionPortfolio/Web.webp';

  readonly options: PortfolioOption[] = [
    { label: 'Focus', value: 'Web Development' },
    { label: 'Stack Used', value: 'WordPress, HTML, CSS, JS, Angular' },
    { label: 'Expertise', value: 'Frontend Development' },
  ];

  readonly quote =
    'Websites developed to deliver seamless user experiences, built using WordPress, HTML, CSS, JS, and Angular. ' +
    'Each project balances functionality, responsiveness, and visual design to meet client requirements.';
}
