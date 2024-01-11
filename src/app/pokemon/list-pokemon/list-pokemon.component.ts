import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html'
})
export class ListPokemonComponent implements OnInit{
  pokemonList: Pokemon[]

  constructor(
    private router: Router,
    private pokemonService: PokemonService
    ) {}

    ngOnInit() {
      //Je me subscribe (abonne) à un observable de mon service qui me retourne une liste de pokémin que j'affecte finalement à l'attribut
        this.pokemonService.getPokemonList()
        .subscribe(pokemonList => this.pokemonList = pokemonList)
    }

  goToPokemon(pokemon: Pokemon){
    this.router.navigate(['/pokemon', pokemon.id])
  }
}
