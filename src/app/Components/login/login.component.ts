import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomFormValidatorService } from '../service/CustomFormValidator.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private formValidatorService: CustomFormValidatorService
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          sessionStorage.setItem('loginToken', response.data.token);
          sessionStorage.setItem('loginData', JSON.stringify(response.data));
          this.router.navigate(['/characters']);
          console.log('Login exitoso:', response);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
          } else {
            this.errorMessage = this.authService.getErrorMessage(error.error.header.resultCode) || 'Ocurrió un error inesperado. Por favor intenta más tarde.';
          }
          console.log('Error en el login:', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }

  hasError(controlName: string): boolean {
    return this.formValidatorService.isControlInvalid(this.loginForm, controlName);
  }

  getErrorMessage(controlName: string): string {
    return this.formValidatorService.getValidationMessage(this.loginForm, controlName);
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}

