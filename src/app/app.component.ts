import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LifeStyleComponent } from './components/life-style/life-style.component';
import { CustomerReviewsComponent } from './customer-reviews/customer-reviews.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AboutUsComponent,CustomerReviewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'safe-bites';
}
