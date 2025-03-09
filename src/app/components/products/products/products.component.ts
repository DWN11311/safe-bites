import { Component, HostListener } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  itemsPerPage = 9;
  currentPage = 1;

  data = [
    {
      productName: 'A',
    },
    {
      productName: 'B',
    },
    {
      productName: 'C',
    },
    {
      productName: 'D',
    },
    {
      productName: 'E',
    },
    {
      productName: 'F',
    },
    {
      productName: 'G',
    },
    {
      productName: 'H',
    },
    {
      productName: 'I',
    },
    {
      productName: 'J',
    },
    {
      productName: 'K',
    },
    {
      productName: 'L',
    },
    {
      productName: 'M',
    },
    {
      productName: 'N',
    },
    {
      productName: 'O',
    },
    {
      productName: 'P',
    },
    {
      productName: 'Q',
    },
    {
      productName: 'R',
    },
    {
      productName: 'S',
    },
    {
      productName: 'T',
    },
    {
      productName: 'U',
    },
    {
      productName: 'V',
    },
    {
      productName: 'W',
    },
    {
      productName: 'X',
    },
    {
      productName: 'Y',
    },
    {
      productName: 'Z',
    },
  ];

  ngOnInit() {
    this.setItemsPerPage();
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
