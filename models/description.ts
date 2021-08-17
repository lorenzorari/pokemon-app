import { NamedAPIResource } from './named-api-resource';

export interface Description {
  description: string;
  language: NamedAPIResource;
}

export declare type Descriptions = Description[];
