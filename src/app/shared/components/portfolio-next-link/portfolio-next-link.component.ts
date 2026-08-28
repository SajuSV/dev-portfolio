import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonSquareDirective } from '../../directives/button-square.directive';

/** The "Next" project teaser link at the bottom of every portfolio detail page. */
@Component({
  selector: 'app-portfolio-next-link',
  standalone: true,
  imports: [RouterLink, ButtonSquareDirective],
  templateUrl: './portfolio-next-link.component.html',
  styleUrl: './portfolio-next-link.component.css',
})
export class PortfolioNextLinkComponent {
  @Input({ required: true }) nextPath!: string;
  @Input({ required: true }) nextTitle!: string;
}
