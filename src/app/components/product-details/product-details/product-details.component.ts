import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTabsComponent } from '../product-tabs/product-tabs.component';
import { ProductGallaryComponent } from '../product-gallery/product-gallery.component';
import { CommonModule } from '@angular/common';
import { ProductInfoComponent } from '../product-info/product-info.component';
import { RelatedProductsComponent } from '../related-products/related-products.component';

@Component({
  selector: 'app-product-details',
  imports: [
    ProductGallaryComponent,
    CommonModule,
    ProductInfoComponent,
    ProductTabsComponent,
    RelatedProductsComponent,
  ],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  data?: Product;
  showProduct = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // reload the product when the id in the url changes
    this.route.paramMap.subscribe(params => {
      this.showProduct = false;
      const id = params.get('id');
      if (id) {
        this.loadProduct(id);
      }
    });
  }

  loadProduct(productId: string) {
    this.productsService.getProductById(productId).subscribe({
      next: (res: any) => {
        this.data = res.data;
        setTimeout(() => {
          this.showProduct = true;
        }, 0);
      },
      error: err => {
        this.router.navigate(['error', 404, 'Could not find product']);
      },
      complete: () => {},
    });
  }
}
