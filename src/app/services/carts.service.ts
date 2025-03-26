import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private readonly dB_URL = "http://192.168.1.18:3000/products";

  constructor(private http:HttpClient) { }
  //handel all request 
  getAllProducts(){
    return this.http.get(this.dB_URL)
  }
}
