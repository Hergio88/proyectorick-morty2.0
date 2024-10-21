import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isLoggedIn = false; // Aquí implementa tu lógica de autenticación

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirigir a la página de login
      return false;
    }

    return true;
  }
}
