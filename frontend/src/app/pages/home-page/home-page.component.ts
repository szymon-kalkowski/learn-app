import { Component } from '@angular/core';
import { BoxComponent } from '../../components/box/box.component';
import { Box } from '../../models/box-model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  boxes: Box[] = [
    {
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Adipisicing',
      date: '2021-10-10',
      time: 5,
      image: 'https://via.placeholder.com/150',
    },
    {
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Adipisicing',
      date: '2021-10-10',
      time: 5,
      image: 'https://via.placeholder.com/150',
    },
    {
      tag: 'Do consectetur',
      title: 'Aliqua Irure Tempor Lorem Adipisicing',
      date: '2021-10-10',
      time: 5,
      image: 'https://via.placeholder.com/150',
    },
  ];
}
