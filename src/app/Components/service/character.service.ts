import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Define las interfaces para la estructura de los personajes y la respuesta de la API
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

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) { }

  // Método para obtener personajes por nombre y página
  getCharacters(name: string, page: number = 1): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}&page=${page}`).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Método para obtener un personaje por ID
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}${id}`).pipe(
      catchError(this.handleError) // Manejo de errores
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ha ocurrido un error inesperado';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage); // Devuelve un observable con el mensaje de error
  }
}
