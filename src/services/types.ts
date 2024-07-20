import { pokeapi } from "src/helpers/http";
import { Type } from "src/models/types";

type Effectiveness = Record<string, number>;

interface EffectivenessGroups {
  noDamageTo: string[];
  quarterDamageTo: string[];
  halfDamageTo: string[];
  normalDamageTo: string[];
  doubleDamageTo: string[];
  quadrupleDamageTo: string[];
  noDamageFrom: string[];
  quarterDamageFrom: string[];
  halfDamageFrom: string[];
  normalDamageFrom: string[];
  doubleDamageFrom: string[];
  quadrupleDamageFrom: string[];
}

async function getType(typeIdOrName: string) {
  return pokeapi.get(`type/${typeIdOrName}`).json<Type>();
}

export async function getTypeEffectiveness(types: string[]) {
  const typeData = await Promise.all(types.map(getType));

  const calculatedDefense = calculateMultipliers(typeData);
  const calculatedAttack = calculateMultipliers(typeData, true);

  const defenseGroup = groupEffectiveness(calculatedDefense, true);
  const effectivenessGroup = groupEffectiveness(
    calculatedAttack,
    false,
    defenseGroup,
  );

  return effectivenessGroup;
}

function calculateMultipliers(
  typeData: Type[],
  isAttack = false,
  effectiveness: Effectiveness = {},
) {
  typeData.forEach((data) => {
    const damageRelations = data.damageRelations;
    const multipliers = [0, 0.5, 2];
    const categories = isAttack
      ? ["noDamageTo", "halfDamageTo", "doubleDamageTo"]
      : ["noDamageFrom", "halfDamageFrom", "doubleDamageFrom"];

    categories.forEach((category, index) => {
      damageRelations[category as keyof Type["damageRelations"]].forEach(
        (type) => {
          effectiveness[type.name] =
            (effectiveness[type.name] || 1) * multipliers[index];
        },
      );
    });
  });

  return effectiveness;
}

function groupEffectiveness(
  effectiveness: Effectiveness,
  isDefensive: boolean,
  groups?: EffectivenessGroups,
): EffectivenessGroups {
  const initialGroups: EffectivenessGroups = {
    noDamageTo: [],
    quarterDamageTo: [],
    halfDamageTo: [],
    normalDamageTo: [],
    doubleDamageTo: [],
    quadrupleDamageTo: [],
    noDamageFrom: [],
    quarterDamageFrom: [],
    halfDamageFrom: [],
    normalDamageFrom: [],
    doubleDamageFrom: [],
    quadrupleDamageFrom: [],
  };

  if (!groups) {
    groups = initialGroups;
  }

  Object.entries(effectiveness).forEach(([type, multiplier]) => {
    const prefix = isDefensive ? "From" : "To";
    switch (multiplier) {
      case 0:
        groups[`noDamage${prefix}` as keyof EffectivenessGroups].push(type);
        break;
      case 0.25:
        groups[`quarterDamage${prefix}` as keyof EffectivenessGroups].push(
          type,
        );
        break;
      case 0.5:
        groups[`halfDamage${prefix}` as keyof EffectivenessGroups].push(type);
        break;
      case 1:
        groups[`normalDamage${prefix}` as keyof EffectivenessGroups].push(type);
        break;
      case 2:
        groups[`doubleDamage${prefix}` as keyof EffectivenessGroups].push(type);
        break;
      case 4:
        groups[`quadrupleDamage${prefix}` as keyof EffectivenessGroups].push(
          type,
        );
        break;
    }
  });

  return groups;
}
