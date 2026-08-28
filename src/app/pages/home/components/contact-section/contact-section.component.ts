import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OsAnimationDirective } from '../../../../shared/directives/os-animation.directive';

interface ContactCard {
  icon: string;
  title: string;
  value: string;
  href?: string;
  target?: string;
}

/** "Let's Create Together" contact-details cards. */
@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, OsAnimationDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.css',
})
export class ContactSectionComponent {
  readonly email = 'sajusv2002@gmail.com';

  readonly cards: ContactCard[] = [
    {
      icon: 'lnr-envelope',
      title: 'Mail',
      value: 'sajusv2002@gmail.com',
      href: 'mailto:sajusv2002@gmail.com',
    },
    {
      icon: 'lnr-location',
      title: 'Location',
      value: 'Kurumathoor, Kuzhithurai Post, KK dist, Tamilnadu -629163',
    },
    {
      icon: 'lnr-phone-handset',
      title: 'Phone',
      value: '+91 88387 95941',
    },
    {
      icon: 'lnr-download',
      title: 'Resume',
      value: 'Download',
      href: "assets/cv/SAJU S V.pdf",
      target: '_blank',
    },
  ];
}
