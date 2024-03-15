import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Link } from '../../models/link.model';
import { Student, Trainer } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: Student | Trainer | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => (this.user = user));
  }

  links: Link[] = [
    { path: '/blog', label: 'Blog' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about-us', label: 'About Us' },
  ];

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
