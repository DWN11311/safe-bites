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
import { ConfirmPaymentComponent } from './components/confirm-payment/confirm-payment.component';
import { PaymentComponent } from './components/payment/payment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'products',
    component: ProductsComponent,
    data: { breadcrumb: 'Products' },
  },
  { path: 'cart', component: CartComponent, data: { breadcrumb: 'Cart' } },

  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] },
  {
    path: 'wishList',
    component: WishListComponent,
    data: { breadcrumb: 'Wishlist' },
  },
  {
    path: 'empty-wishList',
    component: EmptyWishListComponent,
    data: { breadcrumb: 'Wishlist empty' },
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    data: { breadcrumb: 'Product details' },
  },
  {
    path: 'users/:id',
    component: ProfileComponent,
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
    data: { breadcrumb: 'Contact Us' },
  },
  {
    path: 'payment',
    component: PaymentComponent,
    data: { breadcrumb: 'Payment' },
  },
  { path: 'cart', component: CartComponent, data: { breadcrumb: 'Cart' } },
  { path: 'error/:code/:message', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent, data: { breadcrumb: 'Error' } },
];
