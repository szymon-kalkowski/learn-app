import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  constructor() {
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
    alert(this.loginForm.value.username + ' ' + this.loginForm.value.password);
  }
}
