import { NamedAPIResource } from './../named-api-resource';
import { SpeciesDexEntries } from './dex-entry';
import { Genera } from './genus';
import { PalParkEncounterAreas } from './pal-park-encounter-area';
import { SpeciesVarieties } from './variety';

export interface Species {
  id?: number;
  name?: string;
  order?: number;
  genderRate?: number;
  captureRate?: number;
  baseHappiness?: number;
  isBaby?: boolean;
  isLegendary?: boolean;
  isMythical?: boolean;
  hatchCounter?: number;
  hasGenderDifferences?: boolean;
  formsSwitchable?: boolean;
  growthRate?: NamedAPIResource;
  pokedexNumbers?: SpeciesDexEntries;
  eggGroups?: NamedAPIResource;
  color?: NamedAPIResource;
  shape?: NamedAPIResource;
  evolvesFromSpecies?: NamedAPIResource;
  evolutionChain?: any;
  habitat?: NamedAPIResource;
  generation?: NamedAPIResource;
  names?: any;
  palParkEncounters?: PalParkEncounterAreas;
  flavorTextEntries?: any;
  formDescriptions?: any;
  genera?: Genera;
  varieties?: SpeciesVarieties;
}
