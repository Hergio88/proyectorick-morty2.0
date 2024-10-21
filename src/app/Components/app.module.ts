import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CharacterCardComponent } from './character-card/character-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { CharactersComponent } from './characters/characters.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';
import { TranslateEspPipe } from './pipe/translate-esp.pipe';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './service/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    CharacterCardComponent,
    PaginatorComponent,
    CharactersComponent,
    NotFoundComponent,
    NavBarComponent,
    CharacterDetailComponent,
    TranslateEspPipe,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService], // Proveedores de servicios
  bootstrap: [AppComponent] // Componente raíz
})
export class AppModule { }
