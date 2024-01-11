import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, of } from 'rxjs';

@Injectable({
  providedIn: 'root' //== on fournit notre service à toute notre appli (racine)
})
export class PokemonService {

  constructor(private http: HttpClient) {}

  getPokemonList(): Observable<Pokemon[]> {
    // return POKEMONS;
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      //tap c'est un console log pour Observable
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, []))
      )
  }

  getPokemonById(pokemonId: number): Observable<Pokemon|undefined> {
    // return POKEMONS.find(pokemon => pokemon.id == pokemonId)
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      //tap c'est un console log pour Observable
      tap((response) => this.log(response)),
      catchError((error)=> this.handleError(error, undefined))
      )
  }

  //C'est angular par défaut qui renvoie null en cas d'update
  updatePokemon(pokemon: Pokemon): Observable<null>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    //httpOptions c'est pour dire qu'on a des paramètres, infos
    return this.http.put('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    //Je cast avec <Pokemon> pour demander explicitement au serveur de recevoir un pokemon pour avoir accès ensuite
    //dans mes autres méthodes à ce nouvel id
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, null))
    )
  }

  private log(response: any){
    console.table(response)
  }

  private handleError(error: Error, errorValue: any){
    console.error(error)
    return of(errorValue)
  }

  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy'
    ]
  }
}
