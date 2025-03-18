import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  data: Array<Product> = [];

  ngOnInit() {
    const queryString = this.router.url.split('?')[1] || '';

    this.productService.getAllProducts(queryString).subscribe({
      next: (res: any) => {
        this.data = res.data;
        this.calculatePagination();
      },
      error: () => {},
      complete: () => {},
    });

    this.router.events.subscribe(() => {
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
