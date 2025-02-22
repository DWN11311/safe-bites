import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly url = "http://localhost:3000/users"
  constructor(private http: HttpClient) { }
  getAllUsers() {
    return this.http.get(this.url)
  }
  getUserById(id: number) {
    return this.http.get(this.url + "/" + id)
  }
  getUserByEmail(email: string) {
    return this.http.get(`${this.url}?email=${email}`);
  }
  // createUser(user:User){
  //   return this.http.post(this.url, user);
  // }
}
