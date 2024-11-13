import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomFormValidatorService {

  constructor() {}

  private validationMessages: { [key: string]: string | Function } = {
    required: 'Este campo es obligatorio.',
    email: 'Introduce un correo electrónico válido.',
    minlength: (minLength: number) => `Debes ingresar al menos ${minLength} caracteres.`,
    maxlength: (maxLength: number) => `No puedes exceder los ${maxLength} caracteres.`,
    passwordsMismatch: 'Las contraseñas no coinciden.',
  };

  getValidationMessage(form: FormGroup, controlName: string): string {
    const control = form.get(controlName);

    if (control && control.errors) {
      for (const error in control.errors) {
        const message = this.validationMessages[error];
        if (typeof message === 'function') {
          return message(control.errors[error]?.requiredLength);
        }
        return message;
      }
    }
    return '';
  }

isControlInvalid(form: FormGroup, controlName: string): boolean {
  const control = form.get(controlName);
  if (!control) {
    return false;
  }
  return control.invalid && (control.dirty || control.touched);
}
}
