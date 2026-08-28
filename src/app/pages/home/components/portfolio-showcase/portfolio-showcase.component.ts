import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioItem } from '../../../../models/portfolio-item.model';
import { CurtainImageDirective } from '../../../../shared/directives/curtain-image.directive';
import { FigurePortfolioHoverDirective } from '../../../../shared/directives/figure-portfolio-hover.directive';
import { FigurePortfolioRevealDirective } from '../../../../shared/directives/figure-portfolio-reveal.directive';

/**
 * The four-project portfolio grid on the home page. Data-driven so the
 * repeated `figure-portfolio` markup (originally copy/pasted four times in
 * index.html) only exists once.
 */
@Component({
  selector: 'app-portfolio-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CurtainImageDirective,
    FigurePortfolioHoverDirective,
    FigurePortfolioRevealDirective,
  ],
  templateUrl: './portfolio-showcase.component.html',
  styleUrl: './portfolio-showcase.component.css',
})
export class PortfolioShowcaseComponent {
  readonly items: PortfolioItem[] = [
    {
      link: '/webdesign',
      image: 'assets/img/assets/sectionPortfolio/webdesign.webp',
      imageWidth: 1890,
      imageHeight: 1260,
      alt: 'Silence and Noise',
      info: 'Figma',
      title: 'Web Design',
      orientation: 'horizontal',
      align: 'right',
      justify: 'center',
      colClass: '',
    },
    {
      link: '/posterdesign',
      image: 'assets/img/assets/sectionPortfolio/posters.webp',
      imageWidth: 916,
      imageHeight: 1374,
      alt: 'Premium Furniture',
      info: 'Photoshop',
      title: 'Poster Design',
      orientation: 'vertical',
      align: 'left',
      justify: 'start',
      colClass: 'col-lg-7',
    },
    {
      link: '/logodesign',
      image: 'assets/img/assets/sectionPortfolio/logo.webp',
      imageWidth: 1374,
      imageHeight: 916,
      alt: 'Wireless Euphoria',
      info: 'Photoshop',
      title: 'Logo Design',
      orientation: 'vertical',
      align: 'right',
      justify: 'end',
      colClass: 'col-lg-7',
    },
    {
      link: '/webdev',
      image: 'assets/img/assets/sectionPortfolio/Web.webp',
      imageWidth: 1890,
      imageHeight: 1260,
      alt: 'Eternal Art',
      info: 'Html | CSS | JS | Bootstrap | Wordpress',
      title: 'Web Development',
      orientation: 'horizontal',
      align: 'left',
      justify: 'start',
      colClass: 'col-lg-10',
    },
  ];
}
