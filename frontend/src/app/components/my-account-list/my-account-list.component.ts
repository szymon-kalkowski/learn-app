import { Component, OnInit } from '@angular/core';
import { Student, Trainer } from '../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-account-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-account-list.component.html',
  styleUrl: './my-account-list.component.scss',
})
export class MyAccountListComponent implements OnInit {
  student: Student = {} as Student;
  trainer: Trainer = {} as Trainer;
  user: Student | Trainer = {
    id: 'id',
    userId: 'userId',
    password: 'xxx',
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    dateOfBirth: '01.01.1970',
    address: '1234 Elm St.',
    email: 'john.doe@gmail.com',
    photo:
      'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    isActive: true,
    role: 'student',
  };

  ngOnInit() {
    if (this.user.role === 'student') {
      this.student = this.user as Student;
    } else {
      this.trainer = this.user as Trainer;
    }
  }
}
