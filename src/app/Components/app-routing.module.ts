import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: NavBarComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'characters', component: CharactersComponent },
      { path: 'characters/:id', component: CharacterDetailComponent },
      { path: '**', redirectTo: '/not-found' },
      { path: '404', component: NotFoundComponent },
      { path: 'not-found', component: NotFoundComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
