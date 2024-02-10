import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-account-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-account-list.component.html',
  styleUrl: './my-account-list.component.scss',
})
export class MyAccountListComponent {
  user: User = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    dateOfBirth: '01.01.1970',
    address: '1234 Elm St.',
    email: 'john.doe@gmail.com',
    image:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    active: true,
    role: 'student',
  };
}
