import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  loginData = JSON.parse(sessionStorage.getItem('loginData') || '{}');
  userName = this.loginData.user.name
  characterSearched?: []

}
