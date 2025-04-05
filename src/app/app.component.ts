import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsService } from './services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ErrorPageComponent } from './components/error/error.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    BreadcrumbComponent,
    ErrorPageComponent,
  ],
  providers: [ProductsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  hiddenLayoutRoutes = ['/login', '/sign-up'];
  title = 'safe-bites';
  router = inject(Router); // Inject the Router

  shouldDisplayLayout(): boolean {
    return !this.hiddenLayoutRoutes.includes(this.router.url);
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
