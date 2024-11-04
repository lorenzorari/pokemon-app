import classNames from 'classnames';
import { capitalize } from 'src/utils/capitalize';
import { SVG } from 'src/components/SVG';
import { useMemo } from 'react';
import { PokemonType } from 'src/models/types';

interface Props {
  variant: PokemonType;
  withLabel?: boolean;
}

const POKEMON_TYPES = {
  [PokemonType.Bug]: 'bg-bug-1',
  [PokemonType.Dark]: 'bg-dark-1',
  [PokemonType.Dragon]: 'bg-dragon-1',
  [PokemonType.Electric]: 'bg-electric-1',
  [PokemonType.Fairy]: 'bg-fairy-1',
  [PokemonType.Fighting]: 'bg-fighting-1',
  [PokemonType.Fire]: 'bg-fire-1',
  [PokemonType.Flying]: 'bg-flying-1',
  [PokemonType.Ghost]: 'bg-ghost-1',
  [PokemonType.Grass]: 'bg-grass-1',
  [PokemonType.Ground]: 'bg-ground-1',
  [PokemonType.Ice]: 'bg-ice-1',
  [PokemonType.Normal]: 'bg-normal-1',
  [PokemonType.Poison]: 'bg-poison-1',
  [PokemonType.Psychic]: 'bg-psychic-1',
  [PokemonType.Rock]: 'bg-rock-1',
  [PokemonType.Steel]: 'bg-steel-1',
  [PokemonType.Water]: 'bg-water-1',
};

const PokemonTypeBadge = (props: Props) => {
  const { variant, withLabel = false } = props;
  const variantClass = POKEMON_TYPES[variant];
  const iconOnlyClass = 'justify-center p-[6px]';
  const withLabelClass = 'px-[14px] py-1';

  const typeLabel = useMemo(() => capitalize(variant), [variant]);

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1 rounded-full font-bold text-white',
        withLabel ? withLabelClass : iconOnlyClass,
        variantClass,
      )}
      title={withLabel ? undefined : typeLabel}
    >
      <SVG
        className="size-4"
        src={`/assets/svg/pokemon-types/${variant}.svg`}
      />

      {withLabel && typeLabel}
    </span>
  );
};

export default PokemonTypeBadge;
