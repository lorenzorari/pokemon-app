import { NamedAPIResource } from './named-api-resource';

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export declare type Names = Name[];
