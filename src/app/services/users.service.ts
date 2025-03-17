import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url = 'http://localhost:3000/users';
  constructor(private http: HttpClient) {}
  getAllUsers() {
    return this.http.get(this.url);
  }
  getUserById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  getUserByEmail(email: string) {
    return this.http.get(`${this.url}?email=${email}`);
  }
  // createUser(user:User){
  //   return this.http.post(this.url, user);
  // }
  // logIn
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.url}/login`, {
      email,
      password,
    });
  }
}
