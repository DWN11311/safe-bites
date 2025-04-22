import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HoverDirective } from '../../directives/hover.directive';
import { Product } from '../../models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wishlistcard',
  imports: [HoverDirective, RouterModule],
  templateUrl: './wishlistcard.component.html',
  styleUrl: './wishlistcard.component.css',
})
export class WishlistcardComponent {
  @Input() product!: Pick<
    Product,
    | 'name'
    | 'price'
    | 'images'
    | 'brief'
    | 'description'
    | '_id'
    | 'averageRating'
  >;
  @Output() AddToCard = new EventEmitter<
    Pick<
      Product,
      | 'name'
      | 'price'
      | 'images'
      | 'brief'
      | 'description'
      | '_id'
      | 'averageRating'
    >
  >();
  @Output() RemoveFromWishlist = new EventEmitter<string>();

  addToCart() {
    this.AddToCard.emit(this.product);
  }

  removeItem() {
    this.RemoveFromWishlist.emit(this.product._id);
  }
}
