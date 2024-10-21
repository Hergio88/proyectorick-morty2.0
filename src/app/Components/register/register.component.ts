import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validatePasswordMatch } from '../validators/form-validators';
import { AuthenticationService } from '../service/auth.service';
import { HttpClient } from '@angular/common/http';

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
    private router: Router
  ) {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      mail: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(50)]],
      password: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
      confirmPass: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
      address: this.fb.group({
        street: ['', [Validators.required, Validators.maxLength(40)]],
        city: ['', [Validators.required, Validators.maxLength(30)]],
        country: ['', [Validators.required, Validators.maxLength(50)]],
        cp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]],
      })
    }, { validators: validatePasswordMatch('password') });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Estado del formulario antes de enviar:', this.registerForm.valid);
    console.log('Errores del formulario antes de enviar:', this.registerForm.errors);

    if (this.registerForm.valid) {
      console.log("Datos del formulario:", this.registerForm.value); //borrar
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Registro exitoso!';
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = 'Error al registrarse: ' + err.message;
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';

      console.log('Formulario inválido:', this.registerForm.errors);// no borrar
    }
  }

  hasError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }

  getErrorMessage(controlName: string): string {
    if (controlName === 'mail') {
      return this.registerForm.get(controlName)?.hasError('required') ? 'El correo es obligatorio' : 'Correo no válido';
    }
    if (controlName === 'password') {
      return this.registerForm.get(controlName)?.hasError('required') ? 'La contraseña es obligatoria' : 'La contraseña debe tener al menos 6 caracteres';
    }
    if (controlName === 'confirmPass') {

      if (this.registerForm.hasError('passwordMismatch')) {
        return 'Las contraseñas no coinciden';
      }
      return this.registerForm.get(controlName)?.hasError('required') ? 'La confirmación de contraseña es obligatoria' : '';
    }
    return '';
  }

  back(): void {
    this.router.navigate(['/login']);
  }
}
