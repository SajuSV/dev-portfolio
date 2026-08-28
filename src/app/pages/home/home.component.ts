import { Component } from '@angular/core';

import { HeroIntroComponent } from './components/hero-intro/hero-intro.component';
import { PortfolioShowcaseComponent } from './components/portfolio-showcase/portfolio-showcase.component';
import { StatsCounterComponent } from './components/stats-counter/stats-counter.component';
import { ServicesSliderComponent } from './components/services-slider/services-slider.component';
import { ExperienceTimelineComponent } from './components/experience-timeline/experience-timeline.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroIntroComponent,
    PortfolioShowcaseComponent,
    StatsCounterComponent,
    ServicesSliderComponent,
    ExperienceTimelineComponent,
    ContactSectionComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
