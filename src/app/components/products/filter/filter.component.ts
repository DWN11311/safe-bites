import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { Category } from '../../../models/category.model';
import { FilterParams } from '../../../models/filterParams.mode';

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  providers: [CategoriesService],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  priceIsCollapsed = false;
  availabilityIsCollapsed = false;
  categoryIsCollapsed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  sortBy = '';
  sortOrder = '';
  minPrice = '';
  maxPrice = '';
  inStock = '';
  outOfStock = '';

  categories: Category[] = [];

  @Output() sendCategoriesObj = new EventEmitter();

  collapsePrice() {
    this.priceIsCollapsed = !this.priceIsCollapsed;
  }

  collapseAvailability() {
    this.availabilityIsCollapsed = !this.availabilityIsCollapsed;
  }

  collapseCategory() {
    this.categoryIsCollapsed = !this.categoryIsCollapsed;
  }

  collapseSubCateogry(index: number) {
    this.categories[index].isCollapsed = !this.categories[index].isCollapsed;
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: data => {
        this.categories = data;
        this.updateFilters();
        this.sendCategoriesObj.emit(this.categories);
      },
    });
  }

  private updateFilters() {
    this.route.queryParams.subscribe(params => {
      this.sortBy = params['sortBy'] || '';
      this.sortOrder = params['order'] || '';
      this.minPrice = params['minPrice'] || '';
      this.maxPrice = params['maxPrice'] || '';
      this.inStock = params['inStock'] || '';
      this.outOfStock = params['outOfStock'] || '';

      if (params['categories']) {
        const categories: string[] = params['categories'].split(',');
        this.categories.forEach(category => {
          category.checked = categories.includes(category._id);
          category.categories.forEach(subCategory => {
            subCategory.checked = categories.includes(subCategory._id);
          });
        });
      } else {
        this.categories.forEach(category => {
          category.checked = false;
          category.categories.forEach(subCategory => {
            subCategory.checked = false;
          });
        });
      }
    });
  }

  applyFilter() {
    const params: FilterParams = {};

    if (this.sortBy) params.sortBy = this.sortBy;
    if (this.sortOrder) params.order = this.sortOrder;
    if (this.inStock) params.inStock = String(this.inStock);
    if (this.outOfStock) params.outOfStock = String(this.outOfStock);
    if (this.minPrice) params.minPrice = this.minPrice;
    if (this.maxPrice) params.maxPrice = this.maxPrice;

    const categories: string[] = [];

    this.categories.forEach(category => {
      if (category.checked) categories.push(category._id);
      category.categories.forEach(subCategory => {
        if (subCategory.checked) categories.push(subCategory._id);
      });
    });

    if (categories.length) {
      const categoryQuery = categories.join(',');
      params.categories = categoryQuery;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params,
    });
  }

  clearFilters() {
    this.router.navigate([], {
      relativeTo: this.route,
    });
  }
}
