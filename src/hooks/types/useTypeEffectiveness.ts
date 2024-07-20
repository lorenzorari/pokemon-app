import { getTypeEffectiveness } from "src/services/types";
import useSWR from "swr";

export enum TypeEffectivenessGroupLabel {
  Defense = "defense",
  Attack = "attack",
}

export type TypeEffectivenessGroup = {
  noDamage: string[];
  halfDamage: string[];
  doubleDamage: string[];
  quadrupleDamage: string[];
};

export function useTypeEffectiveness(types: string[]) {
  const { data } = useSWR(`type-effectiveness/${types.join("-")}`, () =>
    getTypeEffectiveness(types),
  );

  function getTypeEffectivenessByGroup(
    group: TypeEffectivenessGroupLabel,
  ): TypeEffectivenessGroup {
    if (!data)
      return {
        noDamage: [],
        halfDamage: [],
        doubleDamage: [],
        quadrupleDamage: [],
      };

    const suffix = group === "defense" ? "From" : "To";

    return {
      noDamage: data[`noDamage${suffix}`],
      halfDamage: data[`halfDamage${suffix}`],
      doubleDamage: data[`doubleDamage${suffix}`],
      quadrupleDamage: data[`quadrupleDamage${suffix}`],
    };
  }

  return { typeEffectiveness: data, getTypeEffectivenessByGroup };
}
