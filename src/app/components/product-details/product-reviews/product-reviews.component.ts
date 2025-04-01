import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductReviewsService } from '../../../services/product-reviews.service';
import { ActivatedRoute } from '@angular/router';
import { ProductReview } from '../../../models/product-review.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewFormComponent } from '../../review-form/review-form.component';

@Component({
  selector: 'app-product-reviews',
  imports: [ReactiveFormsModule, ReviewFormComponent],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.css',
})
export class ProductReviewsComponent {
  @ViewChild('addReviewForm') addReviewForm!: ElementRef;
  reviews: ProductReview[] = [];
  count: number = 0;
  loadedReviews: number = 4;
  averageRating: number = 0;
  ratingCounts: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };
  productId: string | undefined;
  constructor(
    private productReviewService: ProductReviewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') as string;

    this.productReviewService.getProductReviews(this.productId).subscribe({
      next: res => {
        const { data } = res;
        this.reviews = data.reviews;
        this.count = data.reviews.length;
        this.averageRating = data.averageRating.toFixed(1);

        this.reviews.forEach(review => {
          this.ratingCounts[review.rating]++;
        });
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  loadMore() {
    console.log('fired');

    if (this.loadedReviews + (4 % this.count) == this.loadedReviews)
      this.loadedReviews = this.loadedReviews + 4;
    else
      this.loadedReviews =
        this.loadedReviews + (this.count - this.loadedReviews);
  }

  sortReviews(e: Event) {
    const value = (e.target as HTMLSelectElement).value;

    if (value === 'asc') {
      this.reviews.sort((a, b) => a.rating - b.rating);
    } else if (value === 'desc') {
      this.reviews.sort((a, b) => b.rating - a.rating);
    }
  }

  addReviewActive = false;
  addReview() {
    this.addReviewActive = true;
    console.log(this.addReviewForm);

    setTimeout(() => {
      this.addReviewForm.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  }
}
