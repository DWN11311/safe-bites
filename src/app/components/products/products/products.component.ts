import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private productService: ProductsService) {}
  data: Array<Product> = [];

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.data = res.data;
        this.calculatePagination();
      },
      error: () => { },
      complete: () => { }
    })
  }
  setItemsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) {
      this.itemsPerPage = 5;
    } else {
      this.itemsPerPage = 9;
    }
    this.currentPage = 1;
    this.totalPages;
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.data.slice(start, end);
  }

  calculatePagination() {
  changePage(page: number) {
    this.currentPage = page;
  }

}
