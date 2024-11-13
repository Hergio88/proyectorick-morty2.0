import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private apiBaseUrl = 'http://api-auth.academy.mobydigital.com/api';

  constructor(private http: HttpClient) { }

  // registrar un nuevo usuario
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/user/register`, userData).pipe(
      catchError(this.handleHttpError)
    );
  }

  //  iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/user/login`, credentials).pipe(
      tap(response => console.log('Inicio de sesión exitoso:', response)),
      catchError(this.handleHttpError)
    );
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('loginToken');
    if (token != null) {
      return true
    }
    return false;

  }

  logout(): void {
    sessionStorage.removeItem('loginToken');
    sessionStorage.removeItem('loginData');
  }

  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => new Error('Error en la solicitud: ' + error.message));
  }

  private errorMessages: { [key: number]: string } = {
    0: 'Operación completada con éxito.',
    1: 'El correo ya está registrado.',
    2: 'Datos de entrada inválidos.',
    3: 'Usuario no encontrado.',
    4: 'La contraseña es incorrecta.',
  };

  getErrorMessage(code: number): string {
    return this.errorMessages[code] || 'Error desconocido.';
  }
}
