import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  persons = [
    {
      name: 'John Doe',
      position: 'Proffesional title',
      description: 'Lorem ipsum officia esse cillum miliets euidba.',
      image: 'assets/about-us/person1.png',
    },
    {
      name: 'Sara Rose',
      position: 'Proffesional title',
      description: 'Lorem ipsum officia esse cillum miliets euidba.',
      image: 'assets/about-us/person2.png',
    },
    {
      name: 'Jack Black',
      position: 'Proffesional title',
      description: 'Lorem ipsum officia esse cillum miliets euidba.',
      image: 'assets/about-us/person3.png',
    },
  ];
}
