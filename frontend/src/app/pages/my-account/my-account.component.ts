import { Component } from '@angular/core';
import { MyAccountListComponent } from '../../components/my-account-list/my-account-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [MyAccountListComponent, RouterLink],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent {}
