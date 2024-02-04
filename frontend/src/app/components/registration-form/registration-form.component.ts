import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  specializations: string[] = [
    'Frontend',
    'Backend',
    'Fullstack',
    'DevOps',
    'QA',
  ];
  registerForm: FormGroup = new FormGroup({});

  fields = {
    firstName: new FormControl<string | null>('', [Validators.required]),
    lastName: new FormControl<string | null>('', [Validators.required]),
    email: new FormControl<string | null>('', [
      Validators.required,
      Validators.email,
    ]),
  };
  trainerFields: FormControls = {
    specialization: new FormControl<string | null>('', [Validators.required]),
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

  onSubmit(): void {
    console.log(this.registerForm.value);
  }
}
