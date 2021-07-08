import { NamedAPIResource } from './../named-api-resource';

export interface PokemonPagination {
  count?: number;
  next?: string;
  previous?: string;
  results?: NamedAPIResource;
}
