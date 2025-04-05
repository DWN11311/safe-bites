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
import { FilterTagsComponent } from '../filter-tags/filter-tags.component';
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';
import { TruncateWordsPipe } from '../../../pipes/truncate-words.pipe';
import { Router } from '@angular/router';
import { WishlistService } from '../../../services/wishlist.service';

@Component({
  selector: 'app-product-card',
  imports: [
    HoverDirective,
    CommonModule,
    FilterComponent,
    TruncateWordsPipe,
    FilterTagsComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit, OnChanges {
  @Input() data: Product[] = [];
  itemsPerPage = 9;
  currentPage = 1;
  totalPages = 0;
  totalItems: number = 0;
  pages: number[] = [];
  paginatedData: Product[] = [];
  filterIsHidden: boolean = false;
  passedCategories: Category[] = [];
  wishlist: string[] = [];

  constructor(
    private router: Router,
    private wishlistService: WishlistService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.getTotalPages();
    this.getPaginatedData();
    this.totalItems = this.data.length;
    this.setItemsPerPage();
    this.calculatePagination();
  }

  ngOnInit(): void {
    this.getPaginatedData();
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    });
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
    this.toggleFilterMenu();
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
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getPaginatedData();
  }

  goToProductDetails(id: number) {
    this.router.navigate(['products/' + id]);
  }

  toggleWishlist(id: number) {}

  isWishlisted(id: number): boolean {
    return this.wishlist.includes(id.toString());
  }
}
