import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { HoverDirective } from '../../../directives/hover.directive';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { FilterTagsComponent } from '../filter-tags/filter-tags.component';
import { Category } from '../../../models/category.model';
import { Product } from '../../../models/product.model';
import { TruncateWordsPipe } from '../../../pipes/truncate-words.pipe';
import { Router } from '@angular/router';
import { Wishlist } from '../../../models/wishlist.model';
import { WishlistService } from '../../../services/wishlist.service';
import { Cart } from '../../../models/cart.model';
import { CartsService } from '../../../services/carts.service';
import { EmptyproductsComponent } from '../../emptyproducts/emptyproducts.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  imports: [
    HoverDirective,
    CommonModule,
    FilterComponent,
    TruncateWordsPipe,
    FilterTagsComponent,
    EmptyproductsComponent,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent implements OnInit {
  @Input() data: Product[] = [];
  @Input() wishlist: Wishlist = {};
  @Input() cartData: Cart = {};
  @Input() totalProducts: number = 0;
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  filterIsHidden: boolean = false;
  passedCategories: Category[] = [];
  token: string | null = localStorage.getItem('token');

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartsService,
    private toaster: ToastrService
  ) {}
  

  ngOnInit(): void {
    // this.getPaginatedData();
    this.wishlistService.wishlist$.subscribe(wishlist => {
      this.wishlist = wishlist;
    });
  }

  onPageClicked(page: number){
    this.pageChange.emit(page);
  }

  getPages(): number[]{
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++){
      pages.push(i);
    }
    return pages;
  }

  toggleFilterMenu() {
    this.filterIsHidden = !this.filterIsHidden;
  }

  passCategories(params: Category[]) {
    this.passedCategories = params;
    this.toggleFilterMenu();
  }

  goToProductDetails(id: string) {
    this.router.navigate(['products/' + id]);
  }

  addToCart(productId: string) {
    if (this.token) {
      this.cartService.addToCart(productId, this.token);
      this.toaster.success("Product added to cart successfully","Success")
    }else{
      this.toaster.success("Faild to add product to cart","Error")
    }
  }

  addToWishlist(productId: string) {
    const token = localStorage.getItem('token');
    if (token) {
      this.wishlistService.addToWishlist(productId, token);
      
    }
  }

  removeFromWishlist(productId: string) {
    const token = localStorage.getItem('token');
    if (token) this.wishlistService.removeFromWishlist(productId, token);
  }
}


/*

  // itemsPerPage = 9;
  // currentPage = 1;
  // totalPages = 0;
  // totalItems: number = 0;
  // pages: number[] = [];
  // paginatedData: Product[] = [];

// ngOnChanges(changes: SimpleChanges): void {
  //   this.getTotalPages();
  //   this.getPaginatedData();
  //   this.totalItems = this.data.length;
  //   this.setItemsPerPage();
  //   this.calculatePagination();
  // }

 // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   this.setItemsPerPage();
  //   this.calculatePagination();
  // }

  // calculatePagination() {
  //   if (this.totalItems) {
  //     this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

  //     this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  //   }
  // }

  // pageClicked(page: number) {
  //   if (page > this.totalPages) return;
  //   if (page < 1) return;
  //   this.currentPage = page;
  //   this.changePage(page);
  // }

// setItemsPerPage() {
  //   const screenWidth = window.innerWidth;
  //   const oldItemsPerPage = this.itemsPerPage;

  //   if (screenWidth <= 768) {
  //     this.itemsPerPage = 5;
  //   } else {
  //     this.itemsPerPage = 9;
  //   }

  //   if (this.itemsPerPage !== oldItemsPerPage) {
  //     this.currentPage = 1;
  //   }

  //   this.calculatePagination();
  // }

  // getPaginatedData() {
  //   const start = (this.currentPage - 1) * this.itemsPerPage;
  //   const end = start + this.itemsPerPage;
  //   this.paginatedData = this.data.slice(start, end);
  // }

  // getTotalPages() {
  //   this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
  // }

  // changePage(page: number) {
  //   this.currentPage = page;
  //   this.getPaginatedData();
  // }
*/