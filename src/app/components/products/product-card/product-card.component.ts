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
import { FilterTagsComponent } from '../filter-tags/filter-tags.component';
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';
import { TruncateWordsPipe } from '../../../pipes/truncate-words.pipe';

@Component({
  selector: 'app-product-card',
  imports: [HoverDirective, CommonModule, FilterComponent, FilterTagsComponent],
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

  filterIsHidden: boolean = false;
  passedCategories: Category[] = [];

  constructor() {}

  ngOnInit(): void {
    this.setItemsPerPage();
    this.calculatePagination();
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

  passCategories(params: Category[]) {
    this.passedCategories = params;
  }
}
