import { useEffect, useState } from "react";
import { DetailField, DetailPanel } from "src/components/details";
import PokemonTypeBadge from "src/components/PokemonTypeBadge";
import { PokemonType } from "src/components/PokemonTypeBadge/PokemonTypeBadge";
import { Button, ButtonVariant } from "src/components/ui/Button";
import {
  TypeEffectivenessGroup,
  TypeEffectivenessGroupLabel,
  useTypeEffectiveness,
} from "src/hooks/types/useTypeEffectiveness";

interface Props {
  types: string[];
}

export const TypeEffectiveness = ({ types }: Props) => {
  const { typeEffectiveness, getTypeEffectivenessByGroup } =
    useTypeEffectiveness(types);
  const [groupActive, setGroupActive] = useState<TypeEffectivenessGroupLabel>(
    TypeEffectivenessGroupLabel.Attack,
  );
  const [displayedGroup, setDisplayedGroup] =
    useState<TypeEffectivenessGroup>();

  useEffect(() => {
    setDisplayedGroup(
      getTypeEffectivenessByGroup(TypeEffectivenessGroupLabel.Attack),
    );
  }, [typeEffectiveness]);

  function setTab(group: TypeEffectivenessGroupLabel) {
    setGroupActive(group);
    setDisplayedGroup(getTypeEffectivenessByGroup(group));
  }

  return (
    <DetailPanel title="Type Effectiveness">
      <div className="mb-4 flex gap-2">
        <Button
          variant={
            groupActive === TypeEffectivenessGroupLabel.Attack
              ? ButtonVariant.Dark
              : ButtonVariant.Outline
          }
          onClick={() => setTab(TypeEffectivenessGroupLabel.Attack)}
        >
          Attack
        </Button>
        <Button
          variant={
            groupActive === TypeEffectivenessGroupLabel.Defense
              ? ButtonVariant.Dark
              : ButtonVariant.Outline
          }
          onClick={() => setTab(TypeEffectivenessGroupLabel.Defense)}
        >
          Defense
        </Button>
      </div>
      <DetailField label="No Damage">
        {displayedGroup?.noDamage?.length ? (
          <div className="flex gap-1">
            {displayedGroup?.noDamage.map((type) => (
              <PokemonTypeBadge key={type} variant={type as PokemonType} />
            ))}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
      <DetailField label="Half Damage">
        {displayedGroup?.halfDamage?.length ? (
          <div className="flex gap-1">
            {displayedGroup?.halfDamage.map((type) => (
              <PokemonTypeBadge key={type} variant={type as PokemonType} />
            ))}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
      <DetailField label="Double Damage">
        {displayedGroup?.doubleDamage?.length ? (
          <div className="flex gap-1">
            {displayedGroup?.doubleDamage.map((type) => (
              <PokemonTypeBadge key={type} variant={type as PokemonType} />
            ))}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
      <DetailField label="Quadruple Damage">
        {displayedGroup?.quadrupleDamage?.length ? (
          <div className="flex gap-1">
            {displayedGroup?.quadrupleDamage.map((type) => (
              <PokemonTypeBadge key={type} variant={type as PokemonType} />
            ))}
          </div>
        ) : (
          <p>None</p>
        )}
      </DetailField>
    </DetailPanel>
  );
};
