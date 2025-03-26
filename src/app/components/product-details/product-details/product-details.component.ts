import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductGallaryComponent } from '../product-gallery/product-gallery.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [ProductGallaryComponent, CommonModule],
  providers: [ProductsService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  data: Product | null = null;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id') as string;

    this.productsService.getProductById(productId).subscribe({
      next: (res: any) => {
        this.data = res.data;
        console.log(this.data);
      },
      error: () => { },
      complete: () => { },
    });
  }
}
