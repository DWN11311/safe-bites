import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { RelatedProductsComponent } from './components/related products/related-products/related-products.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    RelatedProductsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hiddenRoutes = ['/login', '/sign-up'];
  title = 'safe-bites';

  constructor(private router: Router) {}

  shouldDisplayLayout(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
}
