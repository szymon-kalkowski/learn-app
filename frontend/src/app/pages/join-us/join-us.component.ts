import { Component } from '@angular/core';
import { JoinUsBoxComponent } from '../../components/join-us-box/join-us-box.component';
import { JoinUsBox } from '../../models/join-us-box.model';

@Component({
  selector: 'app-join-us',
  standalone: true,
  imports: [JoinUsBoxComponent],
  templateUrl: './join-us.component.html',
  styleUrl: './join-us.component.scss',
})
export class JoinUsComponent {
  boxes: JoinUsBox[] = [
    {
      title: 'Register as Trainer',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'assets/register/trainers.png',
      link: '/register/trainer',
    },
    {
      title: 'Register as Student',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: 'assets/register/students.png',
      link: '/register/student',
    },
  ];
}
