import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductIngredientsComponent } from '../product-ingredients/product-ingredients.component';
import { ProductNutritionComponent } from '../product-nutrition/product-nutrition.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'app-product-tabs',
  standalone: true,
  imports: [
    CommonModule,
    ProductIngredientsComponent,
    ProductNutritionComponent,
    ProductReviewsComponent,
  ],
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.css'],
})
export class ProductTabsComponent {
  selectedTab = 0;

  selectTab(index: number) {
    this.selectedTab = index;
  }
}
