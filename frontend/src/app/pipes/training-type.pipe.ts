import { Pipe, PipeTransform } from '@angular/core';
import { trainingTypes } from '../constants/trainingTypes';

@Pipe({
  name: 'trainingType',
  standalone: true,
})
export class TrainingTypePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }
    const trainingType = trainingTypes.find((t) => t.id === value);
    if (trainingType) {
      return trainingType.trainingType;
    }
    return '';
  }
}
