import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface LoginForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({} as LoginForm);
  loginError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup<LoginForm>({
      username: new FormControl<string | null>('', [Validators.required]),
      password: new FormControl<string | null>('', [Validators.required]),
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.username!, this.loginForm.value.password!)
        .subscribe({
          next: () => {
            this.router.navigate(['/my-account']);
          },
          error: (error) => {
            this.loginError = error;
          },
        });
    }
  }
}
