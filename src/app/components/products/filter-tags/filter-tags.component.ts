import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-filter-tags',
  imports: [],
  templateUrl: './filter-tags.component.html',
  styleUrl: './filter-tags.component.css',
})
export class FilterTagsComponent {
  @Input() categoriesObj: Category[] = [];
  filters: { key: string; label: string }[] = [];

  constructor(private route: ActivatedRoute) {}

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
              if (cat.checked) {
                this.filters.push({ key, label: `${cat.type}` });
              }
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
