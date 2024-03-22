import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddTraining } from '../models/training.model';
import { trainingApiUrl } from '../config';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private http: HttpClient) {}

  addTraining(training: AddTraining) {
    return this.http.post(`${trainingApiUrl}/trainings`, training).pipe(
      tap((response: any) => response),
      catchError((error) => throwError(() => new Error(error.error.message)))
    );
  }

  getTrainings() {
    return this.http.get(`${trainingApiUrl}/trainings`).pipe(
      tap((response: any) => response),
      catchError((error) => throwError(() => new Error(error.error.message)))
    );
  }
}
