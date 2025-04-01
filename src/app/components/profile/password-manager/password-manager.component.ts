import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-manager',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './password-manager.component.html',
  styleUrl: './password-manager.component.css'
})
export class PasswordManagerComponent {
  passwordInformation: FormGroup;
  isToastVisible = false;
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
    
  constructor(private toastr: ToastrService){
    this.passwordInformation = new FormGroup({
      password: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.passwordInformation.get(field);
    return control?.invalid && control?.touched ? true : false;
  }
  
  submitForm() {
    if (this.passwordInformation.invalid) {
      this.passwordInformation.markAllAsTouched();
      console.log('Form is not valid');
      return;
    }
    
    if (this.isToastVisible) {
      return; 
    }

    this.passwordInformation.disable();

    this.isToastVisible = true; 
    this.toastr.success('Password updated successfully!', 'Success');

    setTimeout(() => {
      this.isToastVisible = false;
    }, 3000); 
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'newPassword') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }
}
