import { NamedAPIResource } from './../named-api-resource';

export interface PalParkEncounterArea {
  baseScore?: number;
  rate?: number;
  area?: NamedAPIResource;
}

export declare type PalParkEncounterAreas = PalParkEncounterArea[];
