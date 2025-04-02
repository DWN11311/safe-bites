// app.component.ts
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsService } from './services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    BreadcrumbComponent
  ],
  providers: [ProductsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hiddenLayoutRoutes = ['/login', '/sign-up'];
  title = 'safe-bites';
  router = inject(Router); // Inject the Router

  shouldDisplayLayout(): boolean {
    return !this.hiddenLayoutRoutes.includes(this.router.url);
  }
}