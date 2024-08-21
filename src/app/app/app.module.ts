import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CharacterCardComponent } from '../character-card/character-card.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CharactersComponent } from '../characters/characters.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { CharacterDetailComponent } from '../character-detail/character-detail.component';
import { TranslateEspPipe } from '../pipe/translate-esp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CharacterCardComponent,
    PaginatorComponent,
    CharactersComponent,
    NotFoundComponent,
    NavBarComponent,
    CharacterDetailComponent,
    TranslateEspPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
