import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Link } from '../../models/link.model';

interface User {
  name: string;
  email: string;
  image: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  //   user: User | null = {
  //     name: 'John Doe',
  //     email: 'john.doe@gmail.com',
  //     image: 'https://via.placeholder.com/150',
  //   };
  user: User | null = null;

  links: Link[] = [
    { path: '/blog', label: 'Blog' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about-us', label: 'About Us' },
  ];
}
