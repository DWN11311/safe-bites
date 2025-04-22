// app.component.ts
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsService } from './services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { WishlistService } from './services/wishlist.service';
import { CartsService } from './services/carts.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    BreadcrumbComponent,
    LoadingComponent,
    CommonModule,
  ],
  providers: [ProductsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  hiddenLayoutRoutes = ['/login', '/sign-up'];
  title = 'safe-bites';
  router = inject(Router); // Inject the Router
  loadingState: boolean = false;

  shouldDisplayLayout(): boolean {
    return !this.hiddenLayoutRoutes.includes(this.router.url);
  }

  // change detector helps us tell angular that we are updating the content after it has checked it
  constructor(
    public loadingService: LoadingService,
    private wishlistService: WishlistService,
    private cdref: ChangeDetectorRef,
    private cartService: CartsService
  ) {}

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(wishlist => {
      console.log(wishlist);
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    const token = localStorage.getItem('token');
    if (token) {
      this.wishlistService.getWishlist(token);
      this.cartService.getCart(token);
    }
  }
}
