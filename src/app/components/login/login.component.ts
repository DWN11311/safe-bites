import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  showPassword = false;
  errorEmail: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  constructor(
    private usersService: UsersService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadRememberedUser();
  }

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
    }

    return '';
  }

  login() {
    if (this.loginForm.invalid) {
      return; // Stop submission if form is invalid
    }

    const { email, password, rememberMe } = this.loginForm.value;

    this.usersService.login(email, password).subscribe({
      next: res => {
        const data = res.body;
        if (data.token) {
          console.log(data);
          localStorage.setItem('token', data.token);
          // localStorage.setItem('username', data.firstName);
          // localStorage.setItem('username', "Asmaa");
          // store Fname at local storage
          const decodedToken = this.decodeJWT(data.token);
          localStorage.setItem('firstName', decodedToken.firstName);
          console.log('User First Name:', decodedToken.firstName);
          this.router.navigate(['']);
          // Remeber Me
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', btoa(password));
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
        } else {
          this.errorEmail = 'Invalid email or password.';
        }
      },
      error: err => {
        if (err.status === 400) {
          // Unauthorized
          this.errorEmail = 'Invalid email or password.';
        } else if (err.status === 404) {
          this.errorMessage =
            'This email is not registered. Please sign up first.';
        } else if (err.status === 500) {
          this.errorMessage = 'Server error. Please try again later.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
        console.error('Login error', err);
        this.cdr.detectChanges();
      },
    });
  }

  loadRememberedUser() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    const savedPassword = localStorage.getItem('rememberedPassword');

    if (savedEmail && savedPassword) {
      this.loginForm.patchValue({
        email: savedEmail,
        password: atob(savedPassword),
        rememberMe: true,
      });
    }
  }

  decodeJWT(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  //////////////////////
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
/////////////////////////////////
