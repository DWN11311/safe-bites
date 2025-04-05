import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoverDirective } from '../../directives/hover.directive';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { WishlistcardComponent } from '../wishlistcard/wishlistcard.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmptyWishListComponent } from '../empty-wish-list/empty-wish-list.component';
import { WishlistService } from '../../services/wishlist.service';
import { LoadingService } from '../../services/loading.service';
import { Wishlist } from '../../models/wishlist.model';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [WishlistcardComponent, PopUpComponent, EmptyWishListComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnChanges, OnInit {
  products: Wishlist = {};
  productEntries: Pick<
    Product,
    | 'name'
    | 'price'
    | 'images'
    | 'brief'
    | 'description'
    | '_id'
    | 'averageRating'
  >[] = [];

  constructor(
    private router: Router,
    public wishlistService: WishlistService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe({
      next: wishlist => {
        this.products = wishlist;
        this.productEntries = Object.values(this.products);
      },
    });
  }

  AddToCard(
    product: Pick<
      Product,
      | 'name'
      | 'price'
      | 'images'
      | 'brief'
      | 'description'
      | '_id'
      | 'averageRating'
    >
  ) {}
  ngOnChanges() {}

  removeFromWishlist(productId: string) {
    const token = localStorage.getItem('token');
    if (token) this.wishlistService.removeFromWishlist(productId, token);
  }

  showPopup = false;

  showPopUp() {
    this.showPopup = true;
  }

  removeAll() {
    this.products = {};
    this.showPopup = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  moveToCart() {}
}
