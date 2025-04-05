import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Wishlist } from '../../../models/wishlist.model';
import { WishlistService } from '../../../services/wishlist.service';
import { LoadingService } from '../../../services/loading.service';
import { CartsService } from '../../../services/carts.service';
import { Cart } from '../../../models/cart.model';

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
    private cartService: CartsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  data: Array<Product> = [];
  wishlist: Wishlist = {};
  cartData: Cart = {};

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe({
      next: newWishlist => {
        this.wishlist = newWishlist;
      },
    });

    this.cartService.cart$.subscribe({
      next: data => {
        this.cartData = data;
      },
      error: err => {
        console.log(err);
      },
    });

    this.route.queryParamMap.subscribe(params => {
      this.fetchProducts(params);
    });

    // this.router.events.subscribe(() => {
    //   this.loadingService.show();
    //   const queryString = this.router.url.split('?')[1] || '';
    // });
  }

  fetchProducts(query: ParamMap) {
    this.productService.getAllProducts(query).subscribe({
      next: (res: any) => {
        this.data = res.data;
        this.calculatePagination();
        this.loadingService.hide();
      },
      error: () => {},
      complete: () => {},
    });
  }

  calculatePagination() {}
}
