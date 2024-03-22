import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TrainingService } from '../../services/training.service';
import { Router, RouterLink } from '@angular/router';
import { trainingTypes } from '../../constants/trainingTypes';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-training',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-training.component.html',
  styleUrl: './add-training.component.scss',
})
export class AddTrainingComponent {
  trainingForm: FormGroup = new FormGroup({});
  trainingTypes = trainingTypes;
  trainers: User[] = [];
  user: User | null = null;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private authService: AuthService
  ) {
    this.trainingForm = new FormGroup({
      name: new FormControl<string | null>('', [Validators.required]),
      description: new FormControl<string | null>('', [Validators.required]),
      date: new FormControl<string | null>('', [Validators.required]),
      type: new FormControl<string | null>('', [Validators.required]),
      duration: new FormControl<number | null>(0, [
        Validators.required,
        Validators.min(0),
      ]),
      trainerId: new FormControl<string | null>('', [Validators.required]),
    });
    this.authService.getTrainers().subscribe({
      next: (response: any) => {
        this.trainers = response;
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

  get name() {
    return this.trainingForm.get('name');
  }

  get description() {
    return this.trainingForm.get('description');
  }

  get date() {
    return this.trainingForm.get('date');
  }

  get type() {
    return this.trainingForm.get('type');
  }

  get duration() {
    return this.trainingForm.get('duration');
  }

  get trainerId() {
    return this.trainingForm.get('trainerId');
  }

  onSubmit() {
    if (this.trainingForm.valid) {
      const studentId = this.user?.id;
      this.trainingService
        .addTraining({ ...this.trainingForm.value, studentId })
        .subscribe({
          next: () => {
            this.router.navigate(['/my-account/trainings']);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
