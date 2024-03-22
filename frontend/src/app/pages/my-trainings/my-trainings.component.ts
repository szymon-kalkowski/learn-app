import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-trainings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-trainings.component.html',
  styleUrl: './my-trainings.component.scss',
})
export class MyTrainingsComponent {}
