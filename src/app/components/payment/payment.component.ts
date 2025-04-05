import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-payment',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  contactForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Street: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'
          ),
        ],
      ],
    });
  }

  get phone() {
    return this.contactForm.get('phone');
  }

  get FirstName() {
    return this.contactForm.get('FirstName');
  }
  get LastName() {
    return this.contactForm.get('LastName');
  }

  get Street() {
    return this.contactForm.get('Street');
  }

  get City() {
    return this.contactForm.get('City');
  }

  get Email() {
    return this.contactForm.get('Email');
  }
  submitForm() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    console.log('Form Submitted:', this.contactForm.value);
  }

  checkInputValue(field: string) {
    const control = this.contactForm.get(field);
    if (control?.value) {
      control.markAsTouched();
    }
  }
}
