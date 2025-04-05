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
      if (currentRoute.routeConfig?.data?.['breadcrumb']) {
        url += '/' + currentRoute.url.map(segment => segment.path).join('/');
        breadcrumbs.push({
          label: currentRoute.routeConfig.data['breadcrumb'],
          url,
        });
      }
      currentRoute = currentRoute.firstChild!;
    }

    // ✅ Hide breadcrumbs on home page
    if (breadcrumbs.length === 1) {
      breadcrumbs = [];
    }

    this.breadcrumbs$.next(breadcrumbs);
  }

  getBreadcrumbs() {
    return this.breadcrumbs$.asObservable();
  }
}
