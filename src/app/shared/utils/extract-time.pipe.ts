import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'extractTime' })
export class ExtractTimePipe implements PipeTransform {
  transform(value ?: string): string {
    return value?.split('T')[1].slice(0,5) ?? '';
  }
}
