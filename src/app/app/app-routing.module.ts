import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CharactersComponent } from '../characters/characters.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { CharacterService } from '../service/character.service';

const routes: Routes = [
  { path: '', component: NavBarComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: '', redirectTo: '/characters', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: 'not-found', component: NotFoundComponent },
   { path: '**', redirectTo: '/not-found'},
   { path: 'CharacterService', component: CharacterService},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
