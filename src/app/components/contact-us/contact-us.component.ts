import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
contactForm:FormGroup;
constructor(private fb:FormBuilder){
  this.contactForm=this.fb.group({
    phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]] ,
    subject: ['',[Validators.required]],
    message: ['',[Validators.required]]

  });
}
 
get phone(){
    return this.contactForm.get('phone');
}

get subject(){
  return this.contactForm.get('subject');
}
get message(){
  return this.contactForm.get('message')
}


submitForm(){
  if(this.contactForm.invalid){
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
