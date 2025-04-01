import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-personal-information',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './personal-information.component.html',
  styleUrl: './personal-information.component.css'
})
export class PersonalInformationComponent implements OnInit{
  personalInformation: FormGroup;
  isEditing: boolean = false;
  userId?: string;
  
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private usersService: UsersService
  ){
    this.personalInformation = this.fb.group({
      firstName: [{ value: '', disabled: true }, Validators.required],
      lastName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      phone: [{ value: '', disabled: true }, [Validators.required, Validators.pattern(/^(010|011|012|015)\d{8}$/)]],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    if(this.userId){
      this.getUserData();
    }else{
      this.toastr.error('User id not found', 'Error');
    }
  }

  getUserData(){
   const token = localStorage.getItem('token');
   if(!token){
    this.toastr.error('No authentication token found', 'Error');
    return;
   }
   if(this.userId)
   this.usersService.getUserById(this.userId,token).subscribe({

   })
  }

  toggleEditing(){
    this.isEditing = !this.isEditing;

    if(this.isEditing){
      this.personalInformation.enable();
    }else{
      this.personalInformation.disable();
    }
  }

  isFieldInvalid(field: string): boolean {
    const control = this.personalInformation.get(field);
    return control?.invalid && control?.touched ? true : false;
  }

  onButtonClick() {
    if (!this.isEditing) {
      this.isEditing = true;
      this.personalInformation.enable();
    } else {
      this.submitForm();
    }
  }
  
  submitForm() {
    if (this.personalInformation.invalid) {
      this.personalInformation.markAllAsTouched();
      console.log('Form is not valid');
      return;
    }
    this.isEditing = false;
    this.personalInformation.disable();
    this.toastr.success('Data updated successfully!', 'Success');
  }
}


// onSubmit() {
  //   if(this.personalInformation.invalid){
  //     this.personalInformation.markAllAsTouched();
  //     console.log('Form is not valid');
  //     return;
  //   }

  //   console.log('Data Submitted Successfully', this.personalInformation.value);
  //   this.toggleEditing();
  //   setTimeout(() => { 
  //     this.toastr.success('Data updated successfully!', 'Success');
  //   }, 0);
  // }
