import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: string[] = [];
  private wishlistSubject = new BehaviorSubject<string[]>([])
  wishlist$ = this.wishlistSubject.asObservable();

  private apiUrl = 'http://localhost:8282/wishlist'
  constructor(private http: HttpClient) {}


  fetchWishlist(userId: string){
    if (!userId) {
      console.error('fetchWishlist Error:userId is undefined!');
      return;
    }
    this.http.get<string[]>(`${this.apiUrl}/${userId}`).subscribe((data) => {
      this.wishlist = data;
      this.wishlistSubject.next(this.wishlist);
    });
  }

  addToWishlist(userId: string, productId: string) {
    this.http.post(`${this.apiUrl}/add`, { userId, productId }).subscribe(() => {
      this.wishlist.push(productId);
      this.wishlistSubject.next(this.wishlist);
    })
  }


  removeFromWishlist(userId: string, productId: string) {
    this.http.post(`${this.apiUrl}/remove`, { userId, productId }).subscribe(() => {
      this.wishlist = this.wishlist.filter(id => id !== productId);
      this.wishlistSubject.next(this.wishlist);
    });
  }

  isInWishlist(productId:string):boolean{
   return this.wishlist.includes(productId);
  }
}




