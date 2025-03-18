import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly url = 'http://localhost:8282/categories';

  constructor(private http: HttpClient) {}

  // Use a pipe to fix how the data looks
  // Use this as reference to understand what I'm doing here
  // https://writtenforcoders.com/blog/RxJS-Pipe-the-complete-guide

  getCategories(): Observable<any[]> {
    return this.http
      .get<{ message: string; data: any[] }>(this.url)
      .pipe(map(response => this.formatCategory(response.data)));
  }

  private formatCategory(responseData: any[]) {
    const mainCategories = responseData.filter(category => !category.type);

    return mainCategories.map(mainCat => ({
      _id: mainCat._id,
      type: mainCat.name,
      isCollapsed: false,
      checked: false,
      categories: responseData
        .filter(subCat => subCat.type && subCat.type._id === mainCat._id)
        .map(subCat => ({
          _id: subCat._id,
          name: subCat.name,
          checked: false,
        })),
    }));
  }
}
