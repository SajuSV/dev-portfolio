import { Component, Input } from '@angular/core';
import { OsAnimationDirective } from '../../directives/os-animation.directive';

/** The big pull-quote / description block under the options strip. */
@Component({
  selector: 'app-portfolio-quote',
  standalone: true,
  imports: [OsAnimationDirective],
  templateUrl: './portfolio-quote.component.html',
  styleUrl: './portfolio-quote.component.css',
})
export class PortfolioQuoteComponent {
  @Input({ required: true }) text!: string;
}
