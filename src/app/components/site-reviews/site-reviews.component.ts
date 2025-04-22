import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductReviewsService } from '../../services/product-reviews.service';
import { ActivatedRoute } from '@angular/router';
import { ProductReview } from '../../models/product-review.model';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { SiteReviewsService } from '../../services/site-reviews.service';

@Component({
  selector: 'app-site-reviews',
  imports: [ReviewFormComponent],
  templateUrl: './site-reviews.component.html',
  styleUrl: './site-reviews.component.css',
})
export class SiteReviewsComponent {
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
    private siteReviewSerice: SiteReviewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id') as string;

    this.siteReviewSerice.getAllSiteReviews().subscribe({
      next: res => {
        const { data } = res;

        this.reviews = data.reviews;
        this.count = data.reviews.length;
        this.averageRating = res.data.averageRating;

        console.log(this.reviews);

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
