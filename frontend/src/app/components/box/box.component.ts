import { Component, Input } from '@angular/core';
import { Box } from '../../models/box-model';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent {
  @Input() box: Box = {} as Box;
}
