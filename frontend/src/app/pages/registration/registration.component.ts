import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RegistrationFormComponent } from '../../components/registration-form/registration-form.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RegistrationFormComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  type: string = '';
  studentImage: string = 'assets/register/student.png';
  trainerImage: string = 'assets/register/trainer.png';
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.type = params['type'];
    });
  }
}
