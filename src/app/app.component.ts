import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuoteComponent } from './components/quote/quote.component';
import { LifeStylesComponent } from './components/life-styles/life-styles.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, QuoteComponent, LifeStylesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'safe-bites';
}
