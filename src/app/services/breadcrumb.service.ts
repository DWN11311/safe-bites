import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private router = inject(Router);
  private breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  constructor() {
    // ✅ Run breadcrumbs update on app start
    this.updateBreadcrumbs();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateBreadcrumbs());
  }

  private updateBreadcrumbs(): void {
    let breadcrumbs: Breadcrumb[] = [{ label: 'Home', url: '/' }];
    let currentRoute: ActivatedRouteSnapshot | null =
      this.router.routerState.snapshot.root;
    let url = '';
  
    while (currentRoute) {
      const routeConfig = currentRoute.routeConfig;
      const routeSegments = currentRoute.url.map(segment => segment.path).join('/');

      if (routeSegments) {
        url += `/${routeSegments}`;
      }

      if (routeSegments.match(/products\/\w+/)) {
        breadcrumbs.push({ label: 'Products', url: '/products' });
      }

      if (routeConfig?.data?.['breadcrumb']) {
        breadcrumbs.push({ label: routeConfig.data['breadcrumb'], url });
      }
      currentRoute = currentRoute.firstChild!;
    }
  
    if (breadcrumbs.length === 1) {
      breadcrumbs = [];
    }
    this.breadcrumbs$.next(breadcrumbs);
  }
  

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
}
