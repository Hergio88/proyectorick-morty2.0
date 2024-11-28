import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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
  season: string;
  episodeNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';
  private episodeApiUrl = 'https://rickandmortyapi.com/api/episode/';

  constructor(private http: HttpClient) { }

  getCharacters(name: string, page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}&page=${page}`).pipe(
      catchError(this.handleError)
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError)
    );
  }


  getEpisodesByUrls(urls: string[]): Observable<Episode[]> {
    const episodeRequests = urls.map(url =>
      this.http.get<Episode>(url).pipe(
        catchError(this.handleError)
      )
    );

    return forkJoin(episodeRequests).pipe(
      map((episodes: Episode[]) => episodes.map((episode: Episode) => ({
        name: episode.name,
        episode: episode.episode,
        season: this.extractSeason(episode.episode),
        episodeNumber: this.extractEpisodeNumber(episode.episode)
      })))
    );
  }

  private extractSeason(episodeCode: string): string {
    const match = episodeCode.match(/S(\d{2})/);
    return match ? match[1] : '';
  }

  private extractEpisodeNumber(episodeCode: string): string {
    const match = episodeCode.match(/E(\d{2})/);
    return match ? match[1] : '';
  }


private handleError(error: HttpErrorResponse) {
  let errorMessage = 'Ha ocurrido un error inesperado';

  if (error.error instanceof ErrorEvent) {
    errorMessage = `Error: ${error.error.message}`;
  } else {
    errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
  }

  alert(errorMessage);

  console.error(errorMessage);

  return throwError(errorMessage);
}
}
