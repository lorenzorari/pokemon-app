import { NamedAPIResource } from './../named-api-resource';

export interface FlavorText {
  flavorText: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export declare type FlavorTexts = FlavorText[];
