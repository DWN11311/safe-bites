import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingCounter: number = 0;
  private isLoadingSubject = new BehaviorSubject(false);
  loading$ = this.isLoadingSubject.asObservable();

  show() {
    this.loadingCounter++;
    this.isLoadingSubject.next(true);
  }

  hide() {
    if (this.loadingCounter != 0) {
      this.loadingCounter--;
    }
    if (this.loadingCounter == 0) {
      this.isLoadingSubject.next(false);
    }
  }
}
