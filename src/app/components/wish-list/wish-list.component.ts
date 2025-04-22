import { Component, OnChanges, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HoverDirective } from '../../directives/hover.directive';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { WishlistcardComponent } from '../wishlistcard/wishlistcard.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmptyWishListComponent } from '../empty-wish-list/empty-wish-list.component';
import { WishlistService } from '../../services/wishlist.service';
import { LoadingService } from '../../services/loading.service';
import { Wishlist } from '../../models/wishlist.model';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [
    WishlistcardComponent,
    PopUpComponent,
    EmptyWishListComponent,
    RouterModule,
  ],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent implements OnInit {
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
    private loadingService: LoadingService,
    private cartService: CartsService
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
  ) {
    const token = localStorage.getItem('token');
    if (token) this.cartService.addToCart(product._id, token);
  }

  removeFromWishlist(productId: string) {
    const token = localStorage.getItem('token');
    if (token) this.wishlistService.removeFromWishlist(productId, token);
  }

  showPopup = false;

  showPopUp() {
    this.showPopup = true;
  }

  removeAll() {
    const token = localStorage.getItem('token');

    if (token) this.wishlistService.clearWishList(token);
  }

  moveToCart() {}
}
