import { NamedAPIResource } from "./named-api-resource";

export interface Type {
  id: number;
  name: string;
  damageRelations: DamageRelations;
  gameIndices: GenerationGameIndex[];
  generation: NamedAPIResource;
  moveDamageClass: NamedAPIResource;
  names: Name[];
  pokemon: TypePokemon[];
  moves: NamedAPIResource[];
}

interface DamageRelations {
  noDamageTo: NamedAPIResource[];
  halfDamageTo: NamedAPIResource[];
  doubleDamageTo: NamedAPIResource[];
  noDamageFrom: NamedAPIResource[];
  halfDamageFrom: NamedAPIResource[];
  doubleDamageFrom: NamedAPIResource[];
}

interface GenerationGameIndex {
  gameIndex: number;
  generation: NamedAPIResource;
}

interface Name {
  name: string;
  language: NamedAPIResource;
}

interface TypePokemon {
  slot: number;
  pokemon: NamedAPIResource;
}
