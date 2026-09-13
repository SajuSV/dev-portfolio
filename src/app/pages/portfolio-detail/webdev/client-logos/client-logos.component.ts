import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/** The client-logo grid on the Web Development detail page. */
@Component({
  selector: 'app-client-logos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-logos.component.html',
  styleUrl: './client-logos.component.css',
})
export class ClientLogosComponent {
  readonly logos: string[] = ['infill', 'rp2', 'wac', 'newcon', 'swarmlens', 'assurelens'].map(
    (name) => `assets/img/assets/sectionLogos/${name}.png`
  );
}
