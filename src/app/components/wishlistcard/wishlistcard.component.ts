import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HoverDirective } from '../../directives/hover.directive';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wishlistcard',
  imports: [HoverDirective],
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
