import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LifeStyleComponent } from './components/life-style/life-style.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';
import { FeaturesComponent } from './components/features/features.component';
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AboutUsComponent,CustomerReviewsComponent,FeaturesComponent, FooterComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'safe-bites';
}
