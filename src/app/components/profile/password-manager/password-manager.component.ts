import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-manager',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './password-manager.component.html',
  styleUrl: './password-manager.component.css',
})
export class PasswordManagerComponent {
  passwordInformation: FormGroup;
  isToastVisible = false;
  showPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;
  userId?: string;
  userData: any;
  isPasswordUpdated = false;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
    this.passwordInformation = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.userId =
      this.route.snapshot.paramMap.get('id') ||
      (localStorage.getItem('userId') as string | undefined);
    console.log('Retrieved userId:', this.userId);
    if (!this.userId) {
      this.toastr.error('User id not found', 'Error');
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.passwordInformation.get(field);
    return control?.invalid && control?.touched ? true : false;
  }

  submitForm() {
    if (this.passwordInformation.invalid) {
      this.passwordInformation.markAllAsTouched();
      this.toastr.error('Please fill in all fields correctly.', 'Error');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('Authentication token is missing', 'Error');
      return;
    }

    const { password, newPassword, confirmPassword } =
      this.passwordInformation.value;

    if (newPassword !== confirmPassword) {
      this.toastr.error(
        'New password and confirm password do not match',
        'Error'
      );
      return;
    }

    const requestData = {
      oldPassword: password,
      newPassword: newPassword,
    };

    this.passwordInformation.disable();

    this.usersService.updateUser(this.userId!, requestData, token).subscribe({
      next: () => {
        this.toastr.success('Password updated successfully!', 'Success');
        this.isPasswordUpdated = true;
        // this.passwordInformation.reset();
        // this.passwordInformation.enable();
      },
      error: error => {
        console.error('Update Password Error:', error);
        const errorMessage =
          error?.error?.message ||
          error?.error?.error ||
          error?.message ||
          'Failed to change password';
        this.toastr.error(errorMessage, 'Error');
        this.passwordInformation.enable();
      },
    });
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

// async getUserData() {
//   if (this.userId) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.usersService.getUserById(this.userId, token).subscribe({
//         next: (res) => {
//           this.userData = res.user;
//           console.log('User Data:', this.userData);
//         },
//         error: (error) => {
//           this.toastr.error('Failed to load user data', 'Error');
//           console.error('Error loading user data:', error);
//         }
//       });
//     } else {
//       this.toastr.error('Authentication token is missing', 'Error');
//     }
//   }
// }
