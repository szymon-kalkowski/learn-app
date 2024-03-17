import { Component, OnInit } from '@angular/core';
import { Student, Trainer } from '../../models/user.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { specializations } from '../../constants/specializations';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-account-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './my-account-edit.component.html',
  styleUrl: './my-account-edit.component.scss',
})
export class MyAccountEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});

  specializations = specializations;

  user: Student | Trainer | null = null;

  constructor(private authService: AuthService) {}

  createForm(): void {
    const fields = {
      firstName: new FormControl<string | null>(this.user?.firstName || '', [
        Validators.required,
      ]),
      lastName: new FormControl<string | null>(this.user?.lastName || '', [
        Validators.required,
      ]),
      email: new FormControl<string | null>(this.user?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      active: new FormControl<boolean | null>(this.user?.isActive || false),
    };

    const studentFields = {
      dateOfBirth: new FormControl<string | null>(
        (this.user as Student)?.dateOfBirth || ''
      ),
      address: new FormControl<string | null>(
        (this.user as Student)?.address || ''
      ),
    };

    const trainerFields = {
      specialization: new FormControl<string | null>(
        (this.user as Trainer)?.specializationId || '',
        [Validators.required]
      ),
    };

    this.editForm = new FormGroup({
      ...fields,
      ...(this.user?.role === 'student' ? studentFields : trainerFields),
    });
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = user!;
      this.createForm();
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
