import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // استيراد FormsModule

import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { ConfirmPaymentComponent } from '../confirm-payment/confirm-payment.component';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    OrderSummaryComponent,
    ConfirmPaymentComponent,
  ],
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.css'],
})
export class PaymentMethodsComponent {
  selectedPayment: string = ''; //

  firstName: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  saveCard: boolean = false;
  showConfirmPayment = false;

  toggleConfirmPayment() {
    this.showConfirmPayment = true;
  }

  setPaymentMethod(method: string) {
    this.selectedPayment = method;
  }
}
