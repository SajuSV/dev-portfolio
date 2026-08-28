import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OsAnimationDirective } from '../../../../shared/directives/os-animation.directive';

interface ExperienceEntry {
  image: string;
  date: string;
  datetime: string;
  title: string;
}

/** "Learned & Earned" experience/education timeline. */
@Component({
  selector: 'app-experience-timeline',
  standalone: true,
  imports: [CommonModule, OsAnimationDirective],
  templateUrl: './experience-timeline.component.html',
  styleUrl: './experience-timeline.component.css',
})
export class ExperienceTimelineComponent {
  readonly entries: ExperienceEntry[] = [
    {
      image: 'assets/img/assets/sectionLatestPosts/aatoon.webp',
      date: 'Dec 2024 - till date',
      datetime: '2023-03-14T07:57:01+00:00',
      title: 'Ui-Ux Developer (Aatoon Solutions)',
    },
    {
      image: 'assets/img/assets/sectionLatestPosts/Vismaya.webp',
      date: 'Jan 2023 - Dec 2024',
      datetime: '2023-03-14T07:57:01+00:00',
      title: 'Visual Designer (Vismayamax Studio)',
    },
    {
      image: 'assets/img/assets/sectionLatestPosts/suffix.webp',
      date: 'Jan 2024 - Dec 2024',
      datetime: '2023-03-14T07:57:01+00:00',
      title: 'Fullstack Development - Intern (Part-time)',
    },
    {
      image: 'assets/img/assets/sectionLatestPosts/ponjesly.webp',
      date: '2019 - 2023',
      datetime: '2023-03-14T07:57:01+00:00',
      title: 'Bachelor of Engineering',
    },
  ];
}
