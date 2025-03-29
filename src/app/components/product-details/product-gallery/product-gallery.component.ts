import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Image } from '../../../models/product.model';

@Component({
  selector: 'app-product-gallary',
  imports: [CommonModule],
  templateUrl: './product-gallery.component.html',
  styleUrl: './product-gallery.component.css',
})
export class ProductGallaryComponent {
  @Input() images: Image[] = [];
  currentIndex = 0;
  isFullScreen = false;

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }
  selectImage(index: number) {
    this.currentIndex = index;
  }
  openFullScreen() {
    this.isFullScreen = true;
  }
  closeFullScreen() {
    this.isFullScreen = false;
  }
}
