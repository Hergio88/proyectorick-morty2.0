import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
  episode: string[];
}

interface ApiResponse {
  results: Character[];
  info: {
    pages: number;
  };
}

interface Episode {
  name: string;
  episode: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';
  private episodeApiUrl = 'https://rickandmortyapi.com/api/episode/';

  constructor(private http: HttpClient) { }

  // nombre y página
  getCharacters(name: string, page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

 // detalle por URL
 getEpisodeByUrl(url: string): Observable<Episode> {
  return this.http.get<Episode>(url).pipe(
    catchError(this.handleError)
  );
}


  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
