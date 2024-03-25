import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrainingService } from '../../services/training.service';
import { Training } from '../../models/training.model';
import { TrainingTypePipe } from '../../pipes/training-type.pipe';
import { Student, Trainer } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-my-trainings',
  standalone: true,
  imports: [RouterLink, TrainingTypePipe, BreadcrumbsComponent],
  templateUrl: './my-trainings.component.html',
  styleUrl: './my-trainings.component.scss',
})
export class MyTrainingsComponent {
  trainings: Training[] = [];
  user: Student | Trainer | null = null;

  constructor(
    private trainingService: TrainingService,
    private authService: AuthService
  ) {
    this.trainingService.getTrainings().subscribe({
      next: (response: any) => {
        this.trainings = response;
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
    this.authService.getUser().subscribe({
      next: (response: any) => {
        this.user = response;
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }
}
