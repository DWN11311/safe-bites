import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FeaturesComponent } from '../features/features.component';
import { LifeStylesComponent } from '../life-styles/life-styles.component';
import { QuoteComponent } from '../quote/quote.component';
import { CustomerReviewsComponent } from '../customer-reviews/customer-reviews.component';

import { Router } from '@angular/router';
import { LoadingComponent } from '../../loading/loading.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    FeaturesComponent,
    LifeStylesComponent,
    QuoteComponent,
    CustomerReviewsComponent,
    LoadingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // These states represent the current loading states of the home page to determine whether to display the loading component or not
  navCategoryLoadingState = true;
  navWishlistLoadingState = false;
  navCartLoadingState = false;
}
