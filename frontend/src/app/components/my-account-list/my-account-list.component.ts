import { Component, OnInit } from '@angular/core';
import { Student, Trainer } from '../../models/user.model';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SpecializationPipe } from '../../pipes/specialization.pipe';

@Component({
  selector: 'app-my-account-list',
  standalone: true,
  imports: [RouterLink, SpecializationPipe],
  templateUrl: './my-account-list.component.html',
  styleUrl: './my-account-list.component.scss',
})
export class MyAccountListComponent implements OnInit {
  user: Student | Trainer | null = null;
  student: Student | null = null;
  trainer: Trainer | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user!;
      if (this.user?.role === 'student') {
        this.student = this.user as Student;
      } else {
        this.trainer = this.user as Trainer;
      }
    });
  }
}
