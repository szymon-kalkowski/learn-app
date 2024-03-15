import { Component, OnInit } from '@angular/core';
import { Student, Trainer, User } from '../../models/user.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-account-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './my-account-edit.component.html',
  styleUrl: './my-account-edit.component.scss',
})
export class MyAccountEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});

  specializations: string[] = [
    'Frontend',
    'Backend',
    'Fullstack',
    'DevOps',
    'QA',
  ];

  user: Student | Trainer = {
    id: 'xxx',
    userId: 'yyy',
    password: 'xxxx',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    dateOfBirth: '1970-01-01',
    address: '1234 Elm St.',
    email: 'john.doe@gmail.com',
    photo:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    isActive: true,
    role: 'student',
  };

  fields = {
    firstName: new FormControl<string | null>(this.user.firstName || '', [
      Validators.required,
    ]),
    lastName: new FormControl<string | null>(this.user.lastName || '', [
      Validators.required,
    ]),
    email: new FormControl<string | null>(this.user.email || '', [
      Validators.required,
      Validators.email,
    ]),
    active: new FormControl<boolean | null>(this.user.isActive || false),
  };

  studentFields = {
    dateOfBirth: new FormControl<string | null>(
      (this.user as Student).dateOfBirth || ''
    ),
    address: new FormControl<string | null>(
      (this.user as Student).address || ''
    ),
  };

  trainerFields = {
    specialization: new FormControl<string | null>(
      (this.user as Trainer).specializationId || '',
      [Validators.required]
    ),
  };

  ngOnInit(): void {
    this.editForm = new FormGroup({
      ...this.fields,
      ...(this.user.role === 'student'
        ? this.studentFields
        : this.trainerFields),
    });
  }

  get firstName() {
    return this.editForm.get('firstName');
  }

  get lastName() {
    return this.editForm.get('lastName');
  }

  get email() {
    return this.editForm.get('email');
  }

  get dateOfBirth() {
    return this.editForm.get('dateOfBirth');
  }

  get address() {
    return this.editForm.get('address');
  }

  get specialization() {
    return this.editForm.get('specializationId');
  }

  onSubmit(): void {
    console.log(this.editForm.value);
  }
}
