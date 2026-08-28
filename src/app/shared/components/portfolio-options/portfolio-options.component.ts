import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PortfolioOption } from '../../../models/portfolio-item.model';

/** The "Focus / Tools Used / Purpose" three-column info strip. */
@Component({
  selector: 'app-portfolio-options',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-options.component.html',
  styleUrl: './portfolio-options.component.css',
})
export class PortfolioOptionsComponent {
  @Input({ required: true }) options!: PortfolioOption[];
}
