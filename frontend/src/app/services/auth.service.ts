import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userApiUrl } from '../config';
import {
  BehaviorSubject,
  ReplaySubject,
  catchError,
  tap,
  throwError,
} from 'rxjs';
import {
  Student,
  StudentRegister,
  Trainer,
  TrainerRegister,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject$: BehaviorSubject<Student | Trainer | null> =
    new BehaviorSubject<Student | Trainer | null>(null);

  private isAuthenticated$: ReplaySubject<boolean> = new ReplaySubject<boolean>(
    1
  );

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get(`${userApiUrl}/users/me`).subscribe({
        next: (response: any) => {
          this.userSubject$.next(response);
          this.isAuthenticated$.next(true);
        },
        error: () => {
          this.userSubject$.next(null);
          this.isAuthenticated$.next(false);
        },
      });
    } else {
      this.userSubject$.next(null);
      this.isAuthenticated$.next(false);
    }
  }

  login(email: string, password: string) {
    return this.http.post(`${userApiUrl}/auth/login`, { email, password }).pipe(
      tap((response: any) => {
        this.userSubject$.next(response.user);
        this.isAuthenticated$.next(true);
        localStorage.setItem('token', response.token);
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }

  register(user: StudentRegister | TrainerRegister) {
    return this.http.post(`${userApiUrl}/auth/register`, user).pipe(
      tap((response: any) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }

  logout() {
    this.userSubject$.next(null);
    this.isAuthenticated$.next(false);
    localStorage.removeItem('token');
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return this.http
      .put(`${userApiUrl}/users/update-password`, { oldPassword, newPassword })
      .pipe(
        tap(() => {
          return;
        }),
        catchError((error) => {
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  updateUser(body: any) {
    return this.http.put(`${userApiUrl}/users/me`, body).pipe(
      tap((response: any) => {
        this.userSubject$.next(response);
      }),
      catchError((error) => {
        return throwError(() => new Error(error.error.message));
      })
    );
  }

  getTrainers() {
    return this.http.get(`${userApiUrl}/users/trainers`);
  }

  getUser() {
    return this.userSubject$.asObservable();
  }

  isAuthenticated() {
    return this.isAuthenticated$.asObservable();
  }
}
