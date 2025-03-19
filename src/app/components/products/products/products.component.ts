import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(
    private productService: ProductsService,
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

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setItemsPerPage();
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

  get totalPages() {
    return Math.ceil(this.data.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
  }
}
