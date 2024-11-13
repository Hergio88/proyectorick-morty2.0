import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatePasswordMatch(passwordField: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordField);
    const confirmPassControl = formGroup.get('confirmPass');

    if (!passwordControl || !confirmPassControl) {
      return null; //
    }

    const password = passwordControl.value;
    const confirmPass = confirmPassControl.value;

    if (!password || !confirmPass) {
      return null;
    }

    return password !== confirmPass ? { passwordMismatch: true } : null;
  };
}
