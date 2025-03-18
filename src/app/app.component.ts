import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsService } from './services/products.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  providers: [ProductsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  hiddenRoutes = ['/login', '/sign-up'];
  title = 'safe-bites';

  constructor(private router: Router) {}

  shouldDisplayLayout(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
}
