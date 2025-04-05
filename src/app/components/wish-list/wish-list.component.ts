import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoverDirective } from '../../directives/hover.directive';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { WishlistcardComponent } from '../wishlistcard/wishlistcard.component';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { EmptyWishListComponent } from '../empty-wish-list/empty-wish-list.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [WishlistcardComponent, PopUpComponent, EmptyWishListComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  // constructor(private router: Router) {}
  
}

/*

ngOnInit(): void {
    // if (this.products.length == 0) {
    //   this.router.navigate(["./empty-wish-list"])
    // }
  }
  products: Array<Product> = [
    {
      _id: 1,
      images: [
        { _id: '', imageUrl: 'images/wishList/veganDarkChocolatete2.webp' },
        { _id: '', imageUrl: 'images/wishList/veganDarkChocolate4.webp' },
      ],
      name: 'Organic Honey',
      description: 'Pure organic honey from natural farms.',
      price: 15.99,
      brief: 'Best Seller',
      averageRating: 4.5,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 2,
      images: [
        { _id: '', imageUrl: 'images/wishList/Vegan Granola Clusters.webp' },
        { _id: '', imageUrl: 'images/wishList/Vegan Granola Clusters2.webp' },
      ],
      name: 'Almond Butter',
      description: 'Rich and creamy almond butter with no additives.',
      price: 12.49,
      brief: 'Customer Favorite',
      averageRating: 4.8,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 3,
      images: [
        {
          _id: '',
          imageUrl: 'images/wishList/Sugar-Free Vanilla Protein Shake.jpg',
        },
        {
          _id: '',
          imageUrl: 'images/wishList/Sugar-Free Vanilla Protein Shake4.jpg',
        },
      ],
      name: 'Chia Seeds',
      description: 'High-quality chia seeds packed with nutrients.',
      price: 9.99,
      brief: 'Superfood',
      averageRating: 4.7,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 4,
      images: [
        {
          _id: '',
          imageUrl: 'images/wishList/Sugar-Free Strawberry Jam1.webp',
        },
        {
          _id: '',
          imageUrl: 'images/wishList/Sugar-Free Strawberry Jam3.webp',
        },
      ],
      name: 'Quinoa',
      description: 'Premium white quinoa, gluten-free and protein-rich.',
      price: 11.49,
      brief: 'Healthy Choice',
      averageRating: 4.6,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 5,
      images: [
        {
          _id: '',
          imageUrl:
            'images/wishList/images/wishList/Sugar-Free Peanut Butter1.jpg',
        },
        { _id: '', imageUrl: 'images/wishList/Sugar-Free Peanut Butter4.jpg' },
      ],
      name: 'Matcha Powder',
      description: 'Organic Japanese matcha powder for lattes and smoothies.',
      price: 19.99,
      brief: 'Top Rated',
      averageRating: 4.9,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 6,
      images: [
        {
          _id: '',
          imageUrl:
            'images/wishList/images/wishList/Sugar-Free Dark Chocolate.webp',
        },
        { _id: '', imageUrl: 'images/wishList/sugar-free-dark-chocolate.webp' },
      ],
      name: 'Coconut Oil',
      description: 'Cold-pressed extra virgin coconut oil.',
      price: 8.99,
      brief: 'Versatile Use',
      averageRating: 4.5,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 7,
      images: [
        {
          _id: '',
          imageUrl: 'images/wishList/Sugar-Free Almond Cookies1.webp',
        },
        {
          _id: '',
          imageUrl: 'images/wishList/Sugar-Free Almond Cookies2.webp',
        },
      ],
      name: 'Dark Chocolate',
      description: '85% dark chocolate, rich in antioxidants.',
      price: 5.99,
      brief: 'Indulgent Treat',
      averageRating: 4.4,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
    {
      _id: 8,
      images: [
        { _id: '', imageUrl: 'images/wishList/Low-Carb Avocado Mayo1.jpg' },
        { _id: '', imageUrl: 'images/wishList/Low-Carb Avocado Mayo2.jpg' },
      ],
      name: 'Goji Berries',
      description: 'Dried goji berries, a powerful superfood.',
      price: 14.49,
      brief: 'Superfood',
      averageRating: 4.8,
      quantity: 10,
      categories: [{ _id: 'aaa', name: 'aaaa' }],
    },
  ];
  AddToCard(product: Product) {}
  ngOnChanges() {}
  removeFromWishlist(product: Product) {
    this.products = this.products.filter(p => p._id !== product._id);
  }
  showPopup = false;

  showPopUp() {
    this.showPopup = true;
  }
  removeAll() {
    this.products = [];
    this.showPopup = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  moveToCart() {}

*/
