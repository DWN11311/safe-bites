import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifeStylesComponent } from "./components/life-styles/life-styles.component";
import { HeaderComponent } from "./components/header/header.component";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LifeStyleComponent } from './components/life-style/life-style.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from "./components/footer/footer.component";
import { QuoteComponent } from './components/quote/quote.component';
import { LifeStylesComponent } from './components/life-styles/life-styles.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,AboutUsComponent,CustomerReviewsComponent,FeaturesComponent, FooterComponent, QuoteComponent],