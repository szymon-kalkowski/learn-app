import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password.validator';

interface ChangePasswordFrom {
  currentPassword: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup<ChangePasswordFrom> =
    new FormGroup<ChangePasswordFrom>({} as ChangePasswordFrom);
  changePasswordError: string | null = null;
  confirmPasswordError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.changePasswordForm = new FormGroup<ChangePasswordFrom>(
      {
        currentPassword: new FormControl<string | null>('', [
          Validators.required,
        ]),
        password: new FormControl<string | null>('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl<string | null>(''),
      },
      { validators: confirmPasswordValidator }
    );
  }

  get currentPassword() {
    return this.changePasswordForm.get('currentPassword');
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.authService
        .updatePassword(
          this.changePasswordForm.value.currentPassword!,
          this.changePasswordForm.value.password!
        )
        .subscribe({
          next: () => {
            this.router.navigate(['/my-account']);
          },
          error: (error) => {
            this.changePasswordError = error;
          },
        });
    }
  }
}
