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
  imports: [WishlistcardComponent,PopUpComponent,EmptyWishListComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnChanges, OnInit {
  constructor(private router: Router) {

  }
  ngOnInit(): void {
    // if (this.products.length == 0) {
    //   this.router.navigate(["./empty-wish-list"])
    // }
  }
  products: Array<Product> = [
    {
      id: 1,
      images: ["images/wishList/veganDarkChocolatete2.webp", "images/wishList/veganDarkChocolate4.webp"],
      title: "Organic Honey",
      description: "Pure organic honey from natural farms.",
      price: 15.99,
      brief: "Best Seller",
      rank: 4.5
    },
    {
      id: 2,
      images: ["images/wishList/Vegan Granola Clusters.webp", "images/wishList/Vegan Granola Clusters2.webp"],
      title: "Almond Butter",
      description: "Rich and creamy almond butter with no additives.",
      price: 12.49,
      brief: "Customer Favorite",
      rank: 4.8
    },
    {
      id: 3,
      images: ["images/wishList/Sugar-Free Vanilla Protein Shake.jpg", "images/wishList/Sugar-Free Vanilla Protein Shake4.jpg"],
      title: "Chia Seeds",
      description: "High-quality chia seeds packed with nutrients.",
      price: 9.99,
      brief: "Superfood",
      rank: 4.7
    },
    {
      id: 4,
      images: ["images/wishList/Sugar-Free Strawberry Jam1.webp", "images/wishList/Sugar-Free Strawberry Jam3.webp"],
      title: "Quinoa",
      description: "Premium white quinoa, gluten-free and protein-rich.",
      price: 11.49,
      brief: "Healthy Choice",
      rank: 4.6
    },
    {
      id: 5,
      images: ["images/wishList/Sugar-Free Peanut Butter1.jpg", "images/wishList/Sugar-Free Peanut Butter4.jpg"],
      title: "Matcha Powder",
      description: "Organic Japanese matcha powder for lattes and smoothies.",
      price: 19.99,
      brief: "Top Rated",
      rank: 4.9
    },
    {
      id: 6,
      images: ["images/wishList/Sugar-Free Dark Chocolate.webp", "images/wishList/sugar-free-dark-chocolate.webp"],
      title: "Coconut Oil",
      description: "Cold-pressed extra virgin coconut oil.",
      price: 8.99,
      brief: "Versatile Use",
      rank: 4.5
    },
    {
      id: 7,
      images: ["images/wishList/Sugar-Free Almond Cookies1.webp", "images/wishList/Sugar-Free Almond Cookies2.webp"],
      title: "Dark Chocolate",
      description: "85% dark chocolate, rich in antioxidants.",
      price: 5.99,
      brief: "Indulgent Treat",
      rank: 4.4
    },
    {
      id: 8,
      images: ["images/wishList/Low-Carb Avocado Mayo1.jpg", "images/wishList/Low-Carb Avocado Mayo2.jpg"],
      title: "Goji Berries",
      description: "Dried goji berries, a powerful superfood.",
      price: 14.49,
      brief: "Superfood",
      rank: 4.8
    }
  ];
  AddToCard(product: Product) {

  }
  ngOnChanges() {
  
  }
  removeFromWishlist(product: Product) {
    this.products = this.products.filter(p => p.id !== product.id);
  }
  showPopup = false;

  showPopUp(){
    this.showPopup =true;
  }
  removeAll(){
    this.products=[];
    this.showPopup=false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  moveToCart(){}

}



