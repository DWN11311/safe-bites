import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { HoverDirective } from '../../../directives/hover.directive';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [HoverDirective, CommonModule, FilterComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 0;
  @Input() paginatedData: any[] = [];
  @Output() onClick: EventEmitter<number> = new EventEmitter();
  totalPages = 0;
  pages: number[] = [];
  filters: { key: string; label: string }[] = [];

  filterIsHidden: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.setItemsPerPage();
    this.calculatePagination();

    this.route.queryParamMap.subscribe(params => {
      console.log('params changed');
      this.filters = [];
      params.keys.forEach(key => {
        const value = params.get(key);
        switch (key) {
          case 'minPrice':
            this.filters.push({ key, label: `Min Price ${value}` });
            break;
          case 'maxPrice':
            this.filters.push({ key, label: `Max Price ${value}` });
            break;
          case 'sortBy':
            this.filters.push({ key, label: `Sort By ${value}` });
            break;
          case 'order':
            this.filters.push({ key, label: `Order By ${value}` });
            break;
          case 'inStock':
            this.filters.push({ key, label: `In Stock` });
            break;
          case 'outOfStock':
            this.filters.push({ key, label: `Out Of Stock` });
            break;
          // case 'categoryTypes':
          //   this.filters.push({key, label:``});
          //   break;
          // case 'categories':
          //   this.filters.push({key, label:``});
          //   break;
        }
      });
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setItemsPerPage();
    this.calculatePagination();
  }

  setItemsPerPage() {
    if (window.innerWidth <= 768) {
      this.itemsPerPage = 5;
    } else {
      this.itemsPerPage = 9;
    }
  }

  calculatePagination() {
    if (this.totalItems) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }

  pageClicked(page: number) {
    if (page > this.totalPages) return;
    if (page < 1) return;
    this.onClick.emit(page);
  }

  toggleFilterMenu() {
    this.filterIsHidden = !this.filterIsHidden;
  }
}

// <span class="bg-[#7C9B66] text-white text-sm px-4 rounded-full py-2 max-w-full">Min Price: 500 </span>
