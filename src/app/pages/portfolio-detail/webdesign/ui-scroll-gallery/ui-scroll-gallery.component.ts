import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/**
 * The stacked, sticky-positioned UI screenshot gallery used on the Web
 * Design detail page (`.scroll-cards`). The original relied purely on the
 * `position: sticky` CSS already shipped in main.css - there was no GSAP
 * pinning here - so this component just supplies the data.
 */
@Component({
  selector: 'app-ui-scroll-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-scroll-gallery.component.html',
  styleUrl: './ui-scroll-gallery.component.css',
})
export class UiScrollGalleryComponent {
  readonly images: string[] = Array.from(
    { length: 17 },
    (_, i) => `assets/img/assets/Ui/${i + 1}.webp`
  );
}
