import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-footer',
  imports: [RouterModule,CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  firstName: string | null = '';
  categories: Category[] = [];
 constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
  
    this.firstName = localStorage.getItem('firstName');
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data as Category[];
    });
  }


}
