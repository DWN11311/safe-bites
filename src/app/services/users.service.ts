import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly url = 'http://localhost:8282/users';
  private logoutTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
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

  // Token
  logintoken(token: string) {
    localStorage.setItem('token', token);
    this.scheduleAutoLogout(token);
  }

  scheduleAutoLogout(token: string) {
    const decoded = this.decodeJWT(token);
    if (decoded && decoded.exp) {
      const expTime = decoded.exp * 1000; //
      const currentTime = Date.now();
      const timeoutDuration = expTime - currentTime;

      if (timeoutDuration > 0) {
        this.logoutTimer = setTimeout(() => {
          this.logout();
        }, timeoutDuration);
      } else {
        this.logout();
      }
    } else {
      this.logout();
    }
  }

  decodeJWT(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }

    this.router.navigate(['/login']);
  }
}
