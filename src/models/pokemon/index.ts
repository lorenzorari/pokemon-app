import { NamedAPIResource, NamedAPIResources } from "../named-api-resource";
import { PokemonAbilities } from "./ability";
import { PokemonHeldItems } from "./held-item";
import { PokemonMoves } from "./move";
import { PokemonSprites } from "./sprite";
import { PokemonStat } from "./stat";
import { PokemonTypes } from "./type";

export interface Pokemon {
  id?: number;
  name?: string;
  baseExperience?: number;
  height?: number;
  isDefault?: boolean;
  order?: number;
  weight?: number;
  abilities?: PokemonAbilities;
  forms?: NamedAPIResources;
  gameIndices?: any;
  heldItems?: PokemonHeldItems;
  locationAreaEncounters?: string;
  moves?: PokemonMoves;
  sprites?: PokemonSprites;
  species?: NamedAPIResource;
  stats?: PokemonStat[];
  types?: PokemonTypes;
}

export declare type Pokemons = Pokemon[];
