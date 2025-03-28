import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductGalleryComponent } from '../product-gallery/product-gallery.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-details',
  imports: [ProductGalleryComponent, ProductReviewsComponent],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  data: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') as string;

    this.productsService.getProductById(productId).subscribe({
      next: (res: any) => {
        this.data = res.data;
        // console.log(this.data);
      },
      error: () => {},
      complete: () => {},
    });
  }
}
