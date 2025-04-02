import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../models/category.model';
import { filter, merge } from 'rxjs';

@Component({
  selector: 'app-filter-tags',
  imports: [],
  templateUrl: './filter-tags.component.html',
  styleUrl: './filter-tags.component.css',
})
export class FilterTagsComponent {
  @Input() categoriesObj: Category[] = [];
  filters: { key: string; label: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  removeFilter(filterIndex: number) {
    const currentParams = { ...this.route.snapshot.queryParams };
    const filterToRemove = this.filters[filterIndex];
    const newCategories: string[] = [];

    if (filterToRemove.key !== 'categories') {
      delete currentParams[filterToRemove.key];
    }

    if (filterToRemove.key === 'categories') {
      this.categoriesObj.forEach(category => {
        if (category.type !== filterToRemove.label && category.checked)
          newCategories.push(category._id);

        category.categories.forEach(subCategory => {
          if (subCategory.name !== filterToRemove.label && subCategory.checked)
            newCategories.push(subCategory._id);
        });
      });

      currentParams['categories'] = newCategories.join(',');
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: currentParams,
    });
  }

  ngOnChanges() {
    this.route.queryParamMap.subscribe(params => {
      this.filters = [];
      params.keys.forEach(key => {
        const value = params.get(key);
        switch (key) {
          case 'minPrice':
            this.filters.push({ key, label: `Min Price ${value}` });
            break;
          case 'maxPrice':
            this.filters.push({ key, label: `Max Price ${value}` });
            break;
          case 'sortBy':
            this.filters.push({ key, label: `Sort By ${value}` });
            break;
          case 'order':
            this.filters.push({ key, label: `Order By ${value}` });
            break;
          case 'inStock':
            this.filters.push({ key, label: `In Stock` });
            break;
          case 'outOfStock':
            this.filters.push({ key, label: `Out Of Stock` });
            break;
          case 'categories':
            this.categoriesObj?.forEach(cat => {
              // if (cat.checked) {
              //   this.filters.push({ key, label: `${cat.type}` });
              // }
              cat.categories.forEach(subCat => {
                if (subCat.checked) {
                  this.filters.push({ key, label: `${subCat.name}` });
                }
              });
            });
            break;
        }
      });
    });
  }
}
