import { Component, OnInit} from '@angular/core';
import { Router, RouterOutlet ,NavigationEnd } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsService } from './services/products.service';
import { ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
  ],
  providers: [ProductsService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  hiddenRoutes = ['/login', '/sign-up'];
  title = 'safe-bites';

  constructor(private router: Router) {}

  shouldDisplayLayout(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }
}
