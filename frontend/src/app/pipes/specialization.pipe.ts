import { Pipe, PipeTransform } from '@angular/core';
import { specializations } from '../constants/specializations';

@Pipe({
  name: 'specialization',
  standalone: true,
})
export class SpecializationPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    const specialization = specializations.find((s) => s.id === value);
    if (specialization) {
      return specialization.specialization;
    }
    return '';
  }
}
