import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breadcrumb',
  standalone: true,
})
export class BreadcrumbPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    return value
      .split('-')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' ');
  }
}
