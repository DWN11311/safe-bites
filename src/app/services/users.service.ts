import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url = 'http://localhost:8282/users';

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

  login(email: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(
      `${this.url}/login`,
      {
        email,
        password,
      },
      { observe: 'response' }
    );
  }

  //sign up
  register(user: any): Observable<any> {
    return this.http.post(`${this.url}`, user);
  }
}
