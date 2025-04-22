import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingService } from './loading.service';
import { ToastrService } from 'ngx-toastr';
import { map, finalize } from 'rxjs/operators';
import { ProductReview } from '../models/product-review.model';

@Injectable({
  providedIn: 'root',
})
export class SiteReviewsService {
  private readonly url = 'http://localhost:8282/siteReviews';

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private toaster: ToastrService
  ) {}

  getAllSiteReviews() {
    return this.http.get<any>(this.url).pipe(
      map(res => {
        const reviews: ProductReview[] = res.data.map((review: any) => ({
          userId: review.poster,
          rating: review.rating,
          reviewTitle: review.title,
          reviewDescription: review.description,
          _id: review._id,
        }));

        const averageRating =
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length || 0;

        return {
          message: 'retrieved reviews successfully',
          data: {
            reviews,
            averageRating,
          },
        };
      })
    );
  }
}
