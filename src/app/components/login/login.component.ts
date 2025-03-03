import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email:string="";
  password:string="";
  errorMessage: string="";
  constructor( private UsersService: UsersService, private  router: Router){ }
  login(){
    this.UsersService.login(this.email,this.password).subscribe({
      next:(data)=>{
        console.log(data)
        localStorage.setItem("token",data.token)
        this.router.navigate(['/home'])
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error', err);
      }
    })
  }
}
