import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { LifeStylesComponent } from '../life-styles/life-styles.component';
import { QuoteComponent } from '../quote/quote.component';
import { CustomerReviewsComponent } from '../customer-reviews/customer-reviews.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    FeaturesComponent,
    LifeStylesComponent,
    QuoteComponent,
    CustomerReviewsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
