import { ProfileComponent } from './components/profile/profile/profile.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { ProductsComponent } from './components/products/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up/sign-up.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { EmptyWishListComponent } from './components/empty-wish-list/empty-wish-list.component';
import { ErrorPageComponent } from './components/error/error.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details/product-details.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutusComponent } from './components/about us/aboutus/aboutus.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentMethodsComponent } from './components/payment-methods/payment-methods.component';
import { EmptyproductsComponent } from './components/emptyproducts/emptyproducts.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  {
    path: 'paymentmethods',
    component: PaymentMethodsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Checkout' },
  },
  { path: 'sign-up', component: SignUpComponent },

  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Products' },
  },

  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'wishList',
    component: WishListComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Wishlist' },
  },
  {
    path: 'empty-wishList',
    component: EmptyWishListComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Wishlist empty' },
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Product details' },
  },
  {
    path: 'users/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Profile' },
  },
  {
    path: 'about-us',
    component: AboutusComponent,
    data: { breadcrumb: 'About Us' },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Contact Us' },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { breadcrumb: 'Checkout' },
  },
  {
    path: 'payment-methods',
    component: PaymentMethodsComponent,
    data: { breadcrumb: 'Checkout' },
    canActivate: [AuthGuard],
  },
  {
    path: 'empty-products',
    component: EmptyproductsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'products empty' },
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Cart' },
  },

  {
    path: 'order',
    component: OrderSummaryComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Checkout' },
  },
  {
    path: 'empty-products',
    component: EmptyproductsComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'products empty' },
  },

  { path: 'error/:code/:message',canActivate: [AuthGuard], component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent,canActivate: [AuthGuard], data: { breadcrumb: 'Error' } },
];
