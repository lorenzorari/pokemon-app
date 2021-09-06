import { NamedAPIResource } from './../named-api-resource';

export interface SpeciesDexEntry {
  entryNumber?: number;
  pokedex?: NamedAPIResource;
}

export declare type SpeciesDexEntries = SpeciesDexEntry[];
