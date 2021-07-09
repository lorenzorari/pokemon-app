import { NamedAPIResources } from './../named-api-resource';

export interface PokemonPagination {
  count?: number;
  next?: string;
  previous?: string;
  results?: NamedAPIResources;
}
