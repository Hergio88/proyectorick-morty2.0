import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatePasswordMatch(passwordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get(passwordField)?.value;
    const confirmPass = formGroup.get('confirmPass')?.value;

    if (!password || !confirmPass) {
      return null;
    }

    return password !== confirmPass ? { passwordMismatch: true } : null; // Error si no coinciden
  };
}
