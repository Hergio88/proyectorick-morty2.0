import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Components/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  loginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
  userName = this.loginData.user?.name;

  constructor(private authService: AuthenticationService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
