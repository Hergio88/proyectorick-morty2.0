import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomFormValidatorService } from '../service/CustomFormValidator.Service';
import { AuthenticationService } from '../service/auth.service';
import { validatePasswordMatch } from '../validators/form-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private customFormValidatorService: CustomFormValidatorService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      mail: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(40)]],
        location: ['', [Validators.required, Validators.maxLength(40)]],
        city: ['', [Validators.required, Validators.maxLength(30)]],
        country: ['', [Validators.required, Validators.maxLength(50)]],
        cp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      })
    }, { validators: validatePasswordMatch('password') });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Estado del formulario:', this.registerForm.valid);
    console.log('Errores del formulario:', this.registerForm.errors);

    if (this.registerForm.valid) {
      const userObject = this.createUserObject();

      this.authService.register(userObject).subscribe({
        next: () => {
          this.successMessage = 'Registro exitoso!';
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.registerForm.markAllAsTouched();
      this.logFormErrors(); // Log de errores
    }
  }

  createUserObject() {
    return {
      name: this.registerForm.value.name,
      mail: this.registerForm.value.mail,
      password: this.registerForm.value.password,
      address: {
        street: this.registerForm.value.address.street,
        location: this.registerForm.value.address.location,
        city: this.registerForm.value.address.city,
        country: this.registerForm.value.address.country,
        cp: this.registerForm.value.address.cp,
      }
    };
  }

  handleError(error: HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      const resultCode = error.error.header?.resultCode;
      this.errorMessage = this.authService.getErrorMessage(resultCode) || 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
    } else {
      this.errorMessage = 'Ocurrió un error inesperado. Por favor intenta nuevamente.';
    }
  }

  getErrorMessage(controlName: string): string {
    return this.customFormValidatorService.getValidationMessage(this.registerForm, controlName);
  }

  hasError(controlName: string): boolean {
    return this.customFormValidatorService.isControlInvalid(this.registerForm, controlName);
  }

  back(): void {
    this.router.navigate(['/login']);
  }

  private logFormErrors(): void {
    Object.keys(this.registerForm.controls).forEach(controlName => {
      const control = this.registerForm.get(controlName);
      if (control && control.errors) {
        console.log(`Errores en el campo ${controlName}:`, control.errors);
      }
    });
  }

}
