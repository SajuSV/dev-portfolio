import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * The poster-design image grid. The original used the jQuery Masonry
 * plugin (`js-grid` + `Grid()` in components.js) to lay these out; here the
 * same staggered masonry look is achieved with a dependency-free CSS
 * multi-column layout (see design-masonry-grid.component.css), so no
 * extra JS library is required.
 */
@Component({
  selector: 'app-design-masonry-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-masonry-grid.component.html',
  styleUrl: './design-masonry-grid.component.css',
})
export class DesignMasonryGridComponent {
  readonly images: string[] = [
    'aatoon8',
    'aatoon7',
    'aatoon6',
    'aatoon4',
    'aatoon3',
    'aatoon2',
    'aatoon1',
    'aatoon1a',
    'aatoon2a',
    'aatoon3a',
    'aatoon4a',
    'aatoon5a',
  ].map((name) => `assets/img/assets/designs/${name}.webp`);
}
