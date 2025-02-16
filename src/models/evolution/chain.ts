import { NamedAPIResource } from './../named-api-resource';
import { EvolutionDetail } from './detail';

export interface EvolutionChain {
  id?: number;
  babyTriggerItem?: NamedAPIResource;
  chain?: ChainLink;
}

export interface ChainLink {
  isBaby: boolean;
  species: NamedAPIResource;
  evolutionDetails: EvolutionDetail[];
  evolvesTo: ChainLink[];
}
