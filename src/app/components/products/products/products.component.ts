import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private cartService: CartsService,
  ) {}
  data: Array<Product> = [];
  cartData: Cart = {};

  ngOnInit() {
    // this.router.navigate(['error', 400, 'custom server error']);
    // const queryString = this.router.url.split('?')[1] || '';
    // this.productService.getAllProducts(queryString).subscribe({
    //   next: (res: any) => {
    //     this.data = res.data;
    //     this.calculatePagination();
    //   },
    //   error: () => {},
    //   complete: () => {},
    // });

    this.cartService.cart$.subscribe({
      next: (data) => {
        this.cartData = data;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this.router.events.subscribe(() => {
      const queryString = this.router.url.split('?')[1] || '';
      this.productService.getAllProducts(queryString).subscribe({
        next: (res: any) => {
          this.data = res.data;
          this.calculatePagination();
        },
        error: () => {},
        complete: () => {},
      });
    });
  }

  calculatePagination() {}
}
