import { Component, Input } from '@angular/core';
import { Box } from '../../models/box-model';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {
  @Input() username: string = '';

  boxes: Box[] = [
    {
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Adipisicing',
      date: '2021-10-10',
      time: 5,
      image: 'assets/blog/image7.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Adipisicing',
      date: '2021-10-10',
      time: 5,
      image: 'assets/blog/image8.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Adipisicing',
      date: '2021-10-10',
      time: 5,
      image: 'assets/blog/image9.png',
    },
  ];
}
