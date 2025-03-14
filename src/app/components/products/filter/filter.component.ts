import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface FilterParams {
  sortBy?: string;
  order?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  outOfStock?: string;
  categoryTypes?: string[];
  categories?: string[];
}

@Component({
  selector: 'app-filter',
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  priceIsCollapsed = false;
  availabilityIsCollapsed = false;
  categoryIsCollapsed = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.sortBy = params['sortBy'] || '';
      this.sortOrder = params['order'] || '';
      this.minPrice = params['minPrice'] || '';
      this.maxPrice = params['maxPrice'] || '';
      this.inStock = params['inStock'] || '';
      this.outOfStock = params['outOfStock'] || '';

      console.log(params['categoryTypes'].length, params['categories']);

      const selectedCategoryTypes = params['categories'];
      if (selectedCategoryTypes?.length) {
        this.categories?.forEach(category => {
          category.checked = selectedCategoryTypes.includes(category.type);
        });
      }

      const selectedCategories = params['categories'];
      if (selectedCategories?.length) {
        this.categories.forEach(category => {
          category.categories.forEach(subCategory => {
            subCategory.checked = selectedCategories.includes(subCategory.name);
          });
        });
      }
    });
  }

  sortBy = '';
  sortOrder = '';
  minPrice = '';
  maxPrice = '';
  inStock = '';
  outOfStock = '';

  categories = [
    {
      type: 'Diet',
      isCollapsed: false,
      checked: false,
      categories: [
        { name: 'Keto', checked: false },
        { name: 'Vegan', checked: false },
        { name: 'Low carb', checked: false },
      ],
    },
    {
      type: 'Illness',
      isCollapsed: false,
      checked: false,
      categories: [
        { name: 'Keto', checked: false },
        { name: 'Vegan', checked: false },
        { name: 'Low carb', checked: false },
      ],
    },
  ];

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

  applyFilter() {
    const params: FilterParams = {};

    if (this.sortBy) params.sortBy = this.sortBy;
    if (this.sortOrder) params.order = this.sortOrder;
    if (this.inStock) params.inStock = String(this.inStock);
    if (this.outOfStock) params.outOfStock = String(this.outOfStock);
    if (this.minPrice) params.minPrice = this.minPrice;
    if (this.maxPrice) params.maxPrice = this.maxPrice;

    const categoryTypes = this.categories
      .filter(category => category.checked)
      .map(category => category.type);

    if (categoryTypes.length > 0) params.categoryTypes = categoryTypes;

    const categories = this.categories
      .flatMap(category => category.categories)
      .filter(subCategory => subCategory.checked)
      .map(subCategory => subCategory.name);

    if (categories.length > 0) params.categories = categories;

    const queryString = new URLSearchParams(
      params as Record<string, string>
    ).toString();

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
