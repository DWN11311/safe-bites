import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Wishlist } from '../../../models/wishlist.model';
import { WishlistService } from '../../../services/wishlist.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private productService: ProductsService,
    private wishlistService: WishlistService,
    private loadingService: LoadingService,
    private router: Router
  ) {}
  data: Array<Product> = [];
  wishlist: Wishlist = {};

  ngOnInit() {
    // const queryString = this.router.url.split('?')[1] || '';
    // this.productService.getAllProducts(queryString).subscribe({
    //   next: (res: any) => {
    //     this.data = res.data;
    //     this.calculatePagination();
    //   },
    //   error: () => {},
    //   complete: () => {},
    // });

    this.wishlistService.wishlist$.subscribe({
      next: newWishlist => {
        this.wishlist = newWishlist;
      },
    });

    this.router.events.subscribe(() => {
      this.loadingService.show();
      const queryString = this.router.url.split('?')[1] || '';
      this.productService.getAllProducts(queryString).subscribe({
        next: (res: any) => {
          this.data = res.data;
          this.calculatePagination();
          this.loadingService.hide();
        },
        error: () => {},
        complete: () => {},
      });
    });
  }

  calculatePagination() {}
}
