import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RelatedproductService } from '../../../services/relatedproduct.service';
import { HoverDirective } from '../../../directives/hover.directive';

@Component({
  standalone: true,
  selector: 'app-related-products',
  imports: [RouterModule, CommonModule, HoverDirective],
  providers: [RelatedproductService],
  templateUrl: './related-products.component.html',
})
export class RelatedProductsComponent implements OnInit {
  Relatedproducts: any[] = [];
  currentIndex = 0;
  pageSize = 4;
  @Output() changeProductEvent = new EventEmitter();

  constructor(
    private relatedProductService: RelatedproductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updatePageSize(); // تحديد `pageSize` عند تحميل الصفحة

    this.relatedProductService.getAllProducts().subscribe({
      next: (response: any) => {
        const data = response.data;
        console.log('fire');
        console.log(data);

        this.Relatedproducts = data.map((product: any) => ({
          ...product,
          isheartFilled: false,
        }));
      },
      error: err => {
        console.log(err);
      },
    });
  }

  // تحديث `pageSize` عند تغيير حجم الشاشة
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updatePageSize();
  }

  updatePageSize() {
    const width = window.innerWidth;
    if (width >= 1024) {
      this.pageSize = 4;
    } else if (width >= 768) {
      this.pageSize = 3;
    } else if (width >= 480) {
      this.pageSize = 2;
    } else {
      this.pageSize = 1;
    }
  }

  nextProducts() {
    if (this.currentIndex + this.pageSize < this.Relatedproducts.length) {
      this.currentIndex += this.pageSize;
    } else {
    }
  }

  previousProducts() {
    if (this.currentIndex - this.pageSize >= 0) {
      this.currentIndex -= this.pageSize;
    }
  }

  trackByName(index: number, product: any): string {
    return product.name;
  }

  toggleheart(product: any) {
    product.isheartFilled = !product.isheartFilled;
  }

  isNewProduct(product: any): boolean {
    const release = new Date(product.releaseDate);
    const current = new Date();
    const diff = Math.abs(current.getTime() - release.getTime());
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }

  isdisscount(product: any): boolean {
    return product.discountPrice && parseFloat(product.discountPrice) !== 0;
  }

  goToProduct(id: string) {
    this.router.navigate([`/products/${id}`]);
  }
}
