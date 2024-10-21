import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/characters']);
          console.log('se registro OK');
        },
        error: (error) => {
          console.log('Error en el registro:', error);
          if (error.status === 401) {
            this.errorMessage = 'Credenciales inválidas. Intenta nuevamente.';
          } else {
            this.errorMessage = 'Ocurrió un error inesperado. Por favor intenta más tarde.';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  hasError(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return (control?.invalid ?? false) && (control?.touched ?? false);
  }

  getErrorMessage(controlName: string): string {
    if (controlName === 'mail') {
      return this.loginForm.get(controlName)?.hasError('required') ? 'El correo es obligatorio' : 'Correo no válido';
    }
    if (controlName === 'password') {
      return 'La contraseña es obligatoria';
    }
    return '';
  }

  register(): void {
    this.router.navigate(['/register']);
  }
}
