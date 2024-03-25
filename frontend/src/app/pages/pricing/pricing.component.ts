import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  questions = [
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies ultricies, nunc nunc.',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies ultricies, nunc nunc.',
    },
    {
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nunc nec ultricies ultricies, nunc nunc.',
    },
  ];
}
