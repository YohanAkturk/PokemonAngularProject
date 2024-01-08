import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../pokemon';
import { POKEMONS } from '../mock-pokemon-list';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[]
  pokemon: Pokemon|undefined

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.pokemonList = POKEMONS
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id')
    if(pokemonId){
      this.pokemon = this.pokemonList.find(pokemon => pokemon.id == +pokemonId)
    }
  }
}