import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userApiUrl } from '../config';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Student, Trainer } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<Student | Trainer | null> =
    new BehaviorSubject<Student | Trainer | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.http
        .get(`${userApiUrl}/users/me`)
        .subscribe((response: any) => this.userSubject.next(response));
    } else {
      this.userSubject.next(null);
    }
  }

  login(email: string, password: string) {
    return this.http.post(`${userApiUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        this.userSubject.next(response.user);
        localStorage.setItem('token', response.token);
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }

  logout() {
    this.userSubject.next(null);
    localStorage.removeItem('token');
  }

  getUser() {
    return this.userSubject.asObservable();
  }
}
