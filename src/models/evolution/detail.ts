import { NamedAPIResource } from './../named-api-resource';

export interface EvolutionDetail {
  item: NamedAPIResource;
  trigger: NamedAPIResource;
  gender: number;
  heldItem: NamedAPIResource;
  knownMove: NamedAPIResource;
  knownMoveType: NamedAPIResource;
  location: NamedAPIResource;
  minLevel: number;
  minHappiness: number;
  minBeauty: number;
  minAffection: number;
  needsOverworldRain: boolean;
  partySpecies: NamedAPIResource;
  partyType: NamedAPIResource;
  relativePhysicalStats: number;
  timeOfDay: string;
  tradeSpecies: NamedAPIResource;
  turnUpsideDown: boolean;
}
