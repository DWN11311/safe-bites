import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-reviews',
  imports: [FormsModule, CommonModule],
  templateUrl: './customer-reviews.component.html',
  styleUrl: './customer-reviews.component.css',
})
export class CustomerReviewsComponent {}
