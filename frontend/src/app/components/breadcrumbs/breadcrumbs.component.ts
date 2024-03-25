import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { BreadcrumbPipe } from '../../pipes/breadcrumb.pipe';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink, NgClass, BreadcrumbPipe],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const currentPath = val.url;
        const parts = currentPath.split('/').slice(1);
        this.breadcrumbs = parts.map((part, i) => {
          return {
            label: part,
            url: '/' + parts.slice(0, i + 1).join('/'),
          };
        });
      }
    });
  }
}
