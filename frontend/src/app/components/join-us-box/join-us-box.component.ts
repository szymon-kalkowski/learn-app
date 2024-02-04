import { Component, Input } from '@angular/core';
import { JoinUsBox } from '../../models/join-us-box.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-join-us-box',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './join-us-box.component.html',
  styleUrl: './join-us-box.component.scss',
})
export class JoinUsBoxComponent {
  @Input() box: JoinUsBox = {} as JoinUsBox;
}
