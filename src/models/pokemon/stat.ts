import { NamedAPIResource } from "src/models/named-api-resource";

export interface PokemonStat {
  stat?: NamedAPIResource;
  effort?: number;
  baseStat?: number;
}
