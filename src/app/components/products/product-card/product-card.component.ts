import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { HoverDirective } from '../../../directives/hover.directive';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { ActivatedRoute } from '@angular/router';
import { FilterTagsComponent } from '../filter-tags/filter-tags.component';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product.model';
import { TruncateWordsPipe } from '../../../truncate-words.pipe'

@Component({
  selector: 'app-product-card',
  imports: [HoverDirective, CommonModule, FilterComponent, TruncateWordsPipe, FilterTagsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnChanges {
  itemsPerPage = 9;
  currentPage = 1;
  @Input() data: Product[] = [];
  totalPages = 0;
  totalItems: number = 0;
  pages: number[] = [];
  paginatedData: Product[] = [];
  filterIsHidden: boolean = false;
  passedCategories: Category[] = [];

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.data);
    this.getTotalPages();
    this.getPaginatedData();
    this.totalItems = this.data.length;
    console.log(this.totalItems);
    this.setItemsPerPage();
    this.calculatePagination();
  }

  ngOnInit(): void {

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setItemsPerPage();
    this.calculatePagination();
  }

  calculatePagination() {
    if (this.totalItems) {
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      console.log(this.totalPages);

      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      console.log(this.pages);
    }
  }

  pageClicked(page: number) {
    if (page > this.totalPages) return;
    if (page < 1) return;
    this.currentPage = page;
    this.changePage(page);
  }

  toggleFilterMenu() {
    this.filterIsHidden = !this.filterIsHidden;
  }
  
  passCategories(params: Category[]) {
    this.passedCategories = params;
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
    this.calculatePagination();
  }

  getPaginatedData() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.data.slice(start, end);
    console.log(this.paginatedData);
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    console.log(this.totalPages);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getPaginatedData();
  }
}
