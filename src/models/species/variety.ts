import { NamedAPIResource } from './../named-api-resource';

export interface SpeciesVariety {
  isDefault?: boolean;
  pokemon?: NamedAPIResource;
}

export declare type SpeciesVarieties = SpeciesVariety[];
