import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  imports: [RouterModule,CommonModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  reviews = [
    {
      text: "I love how these products help me maintain a balanced diet. They taste fantastic.",
      image: "images/about us/man 1.png",
      name: "Eily",
      location: "Verified Customer | Suez",
      stars: 5
    },
    {
      text: "Safe Bites has the best selection of keto snacks. The quality is top-notch, and the delivery is always on time!",
      image: "images/about us/man 2.png",
      name: "Mark",
      location: "Verified Customer | Cairo",
      stars: 4
    },
    {
      text: "Great prices and excellent variety. I found exactly what I needed for my diet. Highly recommended!",
      image: "images/about us/man 3.png",
      name: "Sarah",
      location: "Verified Customer | Alexandria",
      stars: 3
    },
    {
      text: "Their products have changed my lifestyle. I feel healthier and more energetic. Thank you, Safe Bites!",
      image: "images/about us/woman 1.png",
      name: "Lina",
      location: "Verified Customer | Giza",
      stars: 5
    },
    {
      text: "Fast delivery and great customer service. Definitely my go-to for keto-friendly snacks!",
      image: "images/about us/woman 2.png",
      name: "Hager",
      location: "Verified Customer | Mansoura",
      stars: 4
    },
    {
      text: "I was skeptical at first, but Safe Bites exceeded my expectations. Amazing products and service!",
      image: "images/about us/woman 3.png",
      name: "Hana",
      location: "Verified Customer | Luxor",
      stars: 5
    }
  ];
  
  currentindex=0
  nextReview(){
  if(this.currentindex<this.reviews.length-1){
    this.currentindex++
  }
  

  }
  prevReview(){ if(this.currentindex>0){
    this.currentindex--
  }


  }
}
