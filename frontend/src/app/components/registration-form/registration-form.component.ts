import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { specializations } from '../../constants/specializations';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface FormControls {
  [key: string]: FormControl;
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent implements OnInit {
  @Input() type: string = '';

  specializations = specializations;
  registerForm: FormGroup = new FormGroup({});
  registerError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  fields = {
    firstName: new FormControl<string | null>('', [Validators.required]),
    lastName: new FormControl<string | null>('', [Validators.required]),
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  };
  trainerFields: FormControls = {
    specializationId: new FormControl<string | null>('', [Validators.required]),
  };
  studentFields: FormControls = {
    dateOfBirth: new FormControl<string | null>(''),
    address: new FormControl<string | null>(''),
  };

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      ...this.fields,
      ...(this.type === 'trainer' ? this.trainerFields : this.studentFields),
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get specialization() {
    return this.registerForm.get('specialization');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .register({
          ...this.registerForm.value,
          role: this.type,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.registerError = error;
          },
        });
    }
  }
}
