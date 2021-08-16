import { NamedAPIResource } from './../named-api-resource';
import { EvolutionDetails } from './detail';

export interface EvolutionChain {
  id?: number;
  babyTriggerItem?: NamedAPIResource;
  chain?: ChainLink;
}

export declare type EvolutionChains = EvolutionChain[];

export interface ChainLink {
  isBaby: boolean;
  species: NamedAPIResource;
  evolutionDetails: EvolutionDetails;
  evolvesTo: ChainLinks;
}

export declare type ChainLinks = ChainLink[];
