import { Component } from '@angular/core';
import { MyAccountListComponent } from '../../components/my-account-list/my-account-list.component';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [MyAccountListComponent],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent {}
