import { PokemonAbilities } from './ability';
import { PokemonHeldItems } from './held-item';
import { PokemonMoves } from './move';
import { PokemonSprites } from './sprite';
import { PokemonStats } from './stat';
import { PokemonTypes } from './type';

export interface Pokemon {
  id?: number;
  name?: string;
  baseExperience?: number;
  height?: number;
  isDefault?: boolean;
  order?: number;
  weight?: number;
  abilities?: PokemonAbilities;
  forms?: any;
  gameIndices?: any;
  heldItems?: PokemonHeldItems;
  locationAreaEncounters?: string;
  moves?: PokemonMoves;
  sprites?: PokemonSprites;
  species?: any;
  stats?: PokemonStats;
  types?: PokemonTypes;
}

export declare type Pokemons = Pokemon[];
