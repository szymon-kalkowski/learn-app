import { Component } from '@angular/core';
import { BoxComponent } from '../../components/box/box.component';
import { Box } from '../../models/box-model';
import { Student, Trainer } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { HomeComponent } from '../../components/home/home.component';
import { UserHomeComponent } from '../../components/user-home/user-home.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomeComponent, UserHomeComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  user: Student | Trainer | null = null;

  constructor(private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }
}
