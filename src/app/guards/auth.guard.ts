import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Components/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private AuthService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const isLoggedIn = this.AuthService.isAuthenticated();
    console.log('Is logged in sergio:', isLoggedIn);

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
