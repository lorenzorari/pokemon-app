export interface Pokemon {
  id?: number;
  name?: string;
  baseExperience?: number;
  height?: number;
  isDefault?: boolean;
  order?: number;
  weight?: number;
  abilities?: any;
  forms?: any;
  gameIndices?: any;
  heldItems?: any;
  locationAreaEncounters?: string;
  moves?: any;
  sprites?: any;
  species?: any;
  stats?: any;
  types?: any;
}

export declare type Pokemons = Pokemon[];
