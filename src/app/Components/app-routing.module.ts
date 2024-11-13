import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from '../shared/nav-bar/nav-bar.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { CharacterService } from './service/character.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'characters', canActivate: [AuthGuard],component: CharactersComponent },
  { path: 'characters/:id', canActivate: [AuthGuard], component: CharacterDetailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
