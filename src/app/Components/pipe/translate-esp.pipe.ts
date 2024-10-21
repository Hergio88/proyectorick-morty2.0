import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateEsp'
})
export class TranslateEspPipe implements PipeTransform {

  transform(value: string, type: 'status' | 'gender'): string {
    if (type === 'status') {
      switch (value) {
        case 'Alive':
          return 'Vivo';
        case 'Dead':
          return 'Muerto';
        case 'unknown':
          return 'Desconocido';
        default:
          return value;
      }
    } else if (type === 'gender') {
      switch (value) {
        case 'Male':
          return 'Masculino';
        case 'Female':
          return 'Femenino';
        case 'Genderless':
          return 'Sin género';
        case 'unknown':
          return 'Desconocido';
        default:
          return value;
      }
    }
    return value;
  }
}
