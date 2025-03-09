import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
 imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  errorMessage: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private usersService: UsersService, private router: Router,  private cdr: ChangeDetectorRef) {}

  getEmailError(): string {
    const emailControl = this.loginForm.get('email');

    if (emailControl?.hasError('required')) {
      return 'This input is required';
    } else if (emailControl?.hasError('email')) {
      return 'Invalid email format';
    }

    return '';
  }

  getPasswordError(): string {
    const passwordControl = this.loginForm.get('password');

    if (passwordControl?.hasError('required')) {
      return 'This input is required';
    } else if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 9 characters';
    }

    return '';
  }

  login() {
    if (this.loginForm.invalid) {
      return; // Stop submission if form is invalid
    }

    const { email, password } = this.loginForm.value;

    this.usersService.login(email, password).subscribe({
      next: (data) => {
        const token  = data.headers.get('x-auth-token') as string;
        console.log(data);
        localStorage.setItem('token',token);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error', err);
        this.cdr.detectChanges();
      },
    });
  }
}

