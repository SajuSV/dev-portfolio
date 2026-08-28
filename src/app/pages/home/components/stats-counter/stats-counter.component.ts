import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterUpDirective } from '../../../../shared/directives/counter-up.directive';

interface Stat {
  id: string;
  from: number;
  to: number;
  duration: number;
  suffix: string;
  label: string;
}

/**
 * The "years / sites / pages / posters" counter strip. Values/timings are a
 * direct port of the four `observeCounter(...)` calls in js/components.js.
 */
@Component({
  selector: 'app-stats-counter',
  standalone: true,
  imports: [CommonModule, CounterUpDirective],
  templateUrl: './stats-counter.component.html',
  styleUrl: './stats-counter.component.css',
})
export class StatsCounterComponent {
  readonly stats: Stat[] = [
    { id: 'count1', from: 0, to: 1, duration: 1000, suffix: '.8+', label: 'Years as UI UX Developer' },
    { id: 'count2', from: 0, to: 10, duration: 1500, suffix: '+', label: 'WordPress Sites' },
    { id: 'count3', from: 0, to: 30, duration: 2000, suffix: '+', label: 'Web Page Design' },
    { id: 'count4', from: 0, to: 100, duration: 2500, suffix: '+', label: 'Poster Design' },
  ];
}
