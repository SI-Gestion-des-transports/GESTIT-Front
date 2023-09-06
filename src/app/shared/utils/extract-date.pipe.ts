import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extractDate' })
export class ExtractDatePipe implements PipeTransform {
  transform(value?: string): string {
    return value?.split('T')[0] ?? '';
  }
}
