import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
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

  getUserById(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(this.url + '/' + id, { headers });
  }

  updateUser(id: string, userData: any, token: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(`${this.url}/${id}`,userData,{headers});
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

  //LOGIN WITH GOOGLE
  verifyGoogleToken(token: string): Observable<any> {
    return this.http.post<{ token: string }>(
      'http://localhost:8282/auth/google',
      { token }
    );
  }
}
