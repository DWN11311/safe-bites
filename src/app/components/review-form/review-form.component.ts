import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductReviewsService } from '../../services/product-reviews.service';
import { ProductReview } from '../../models/product-review.model';

@Component({
  selector: 'app-review-form',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css',
})
export class ReviewFormComponent {
  @Input() productId: string | undefined;

  constructor(private productReviewsService: ProductReviewsService) {}

  reviewFormGroup = new FormGroup({
    reviewTitle: new FormControl(null, [Validators.required]),
    reviewDescription: new FormControl(null, [Validators.required]),
  });

  userRating = 1;
  changeRating(newRating: number) {
    this.userRating = newRating;
    console.log(this.userRating);
  }

  reviewSubmit() {
    if (this.reviewFormGroup.valid) {
      const reviewObj = {
        ...this.reviewFormGroup.value,
        rating: this.userRating,
      };

      this.productReviewsService
        .addNewReview(
          reviewObj,
          this.productId as string,
          localStorage.getItem('token') as string
        )
        .subscribe({
          next: response => {
            console.log('Review added successfully:', response);
          },
          error: err => {
            console.error('Error adding review:', err);
          },
        });
    } else {
      this.reviewFormGroup.markAllAsTouched();
    }
  }
}
