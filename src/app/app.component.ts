import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LifeStylesComponent } from './components/life-styles/life-styles.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from './components/footer/footer.component';
import { QuoteComponent } from './components/quote/quote.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    AboutUsComponent,
    CustomerReviewsComponent,
    FeaturesComponent,
    FooterComponent,
    QuoteComponent,
    LifeStylesComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'safe-bites';
}
