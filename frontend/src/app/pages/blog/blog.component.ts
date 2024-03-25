import { Component } from '@angular/core';
import { Box } from '../../models/box-model';
import { BoxComponent } from '../../components/box/box.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [BoxComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  boxes: Box[] = [
    {
      tag: 'Do consectetur',
      title: 'Blog title',
      date: 'Date',
      time: 5,
      image: 'assets/blog/image1.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Blog title',
      date: 'Date',
      time: 5,
      image: 'assets/blog/image2.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Blog title',
      date: 'Date',
      time: 5,
      image: 'assets/blog/image3.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Blog title',
      date: 'Date',
      time: 5,
      image: 'assets/blog/image4.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Blog title',
      date: 'Date',
      time: 5,
      image: 'assets/blog/image5.png',
    },
    {
      tag: 'Do consectetur',
      title: 'Blog title',
      date: 'Date',
      time: 5,
      image: 'assets/blog/image6.png',
    },
  ];
}
