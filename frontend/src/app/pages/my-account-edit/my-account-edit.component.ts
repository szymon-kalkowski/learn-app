import { Component, OnInit } from '@angular/core';
import { Student, Trainer } from '../../models/user.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { specializations } from '../../constants/specializations';
import { AuthService } from '../../services/auth.service';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-my-account-edit',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, BreadcrumbsComponent],
  templateUrl: './my-account-edit.component.html',
  styleUrl: './my-account-edit.component.scss',
})
export class MyAccountEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  editError: string | null = null;

  specializations = specializations;

  user: Student | Trainer | null = null;

  constructor(private authService: AuthService, private router: Router) {}

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
      isActive: new FormControl<boolean | null>(this.user?.isActive || false),
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
      specializationId: new FormControl<string | null>(
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

  get specializationId() {
    return this.editForm.get('specializationId');
  }

  onSubmit(): void {
    this.authService.updateUser(this.editForm.value).subscribe({
      next: () => {
        this.router.navigate(['/my-account']);
      },
      error: (error) => {
        this.editError = error;
      },
    });
  }
}
