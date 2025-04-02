import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  showPassword = false;
  myform = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z]+$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$'),
    ]),
  });
  get firstnameRequired() {
    return (
      this.myform.controls.firstname.hasError('required') &&
      (this.myform.controls.firstname.touched ||
        this.myform.controls.firstname.dirty) &&
      !this.myform.controls.firstname.hasError('pattern')
    );
  }
  get firstnamepattern() {
    return (
      this.myform.controls.firstname.hasError('pattern') &&
      (this.myform.controls.firstname.touched ||
        this.myform.controls.firstname.dirty) &&
      !this.myform.controls.firstname.hasError('required')
    );
  }
  get lastnameRequired() {
    return (
      this.myform.controls.lastname.hasError('required') &&
      (this.myform.controls.lastname.touched ||
        this.myform.controls.lastname.dirty) &&
      !this.myform.controls.firstname.hasError('pattern')
    );
  }
  get lastnamepattern() {
    return (
      this.myform.controls.lastname.hasError('pattern') &&
      (this.myform.controls.lastname.touched ||
        this.myform.controls.lastname.dirty) &&
      !this.myform.controls.lastname.hasError('required')
    );
  }
  get emailRequired() {
    return (
      this.myform.controls.email.hasError('required') &&
      (this.myform.controls.email.touched ||
        this.myform.controls.email.dirty) &&
      !this.myform.controls.firstname.hasError('pattern')
    );
  }
  get emailvalidation() {
    return (
      this.myform.controls.email.hasError('pattern') &&
      this.myform.controls.email.touched
    );
  }
  hasUpperCase() {
    const passwordValue = this.myform.get('password')?.value || '';
    return /[A-Z]/.test(passwordValue);
  }
  hasSpecialCharacter() {
    const passwordValue = this.myform.get('password')?.value || '';
    return /[0-9]/.test(passwordValue);
  }
  hasNumber() {
    const passwordValue = this.myform.get('password')?.value || '';
    return /[!@#$%^&*]/.test(passwordValue);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  data() {}
}
