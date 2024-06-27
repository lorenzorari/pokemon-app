import classNames from "classnames";

export enum PokemonType {
  Bug = "bug",
  Dark = "dark",
  Dragon = "dragon",
  Electric = "electric",
  Fairy = "fairy",
  Fighting = "fighting",
  Fire = "fire",
  Flying = "flying",
  Ghost = "ghost",
  Grass = "grass",
  Ground = "ground",
  Ice = "ice",
  Normal = "normal",
  Poison = "poison",
  Psychic = "psychic",
  Rock = "rock",
  Steel = "steel",
  Water = "water",
}

interface Props {
  variant: PokemonType;
}

const POKEMON_TYPES = {
  [PokemonType.Bug]: "bg-bug-1",
  [PokemonType.Dark]: "bg-dark-1",
  [PokemonType.Dragon]: "bg-dragon-1",
  [PokemonType.Electric]: "bg-electric-1",
  [PokemonType.Fairy]: "bg-fairy-1",
  [PokemonType.Fighting]: "bg-fighting-1",
  [PokemonType.Fire]: "bg-fire-1",
  [PokemonType.Flying]: "bg-flying-1",
  [PokemonType.Ghost]: "bg-ghost-1",
  [PokemonType.Grass]: "bg-grass-1",
  [PokemonType.Ground]: "bg-ground-1",
  [PokemonType.Ice]: "bg-ice-1",
  [PokemonType.Normal]: "bg-normal-1",
  [PokemonType.Poison]: "bg-poison-1",
  [PokemonType.Psychic]: "bg-psychic-1",
  [PokemonType.Rock]: "bg-rock-1",
  [PokemonType.Steel]: "bg-steel-1",
  [PokemonType.Water]: "bg-water-1",
};

const PokemonTypeBadge = (props: Props) => {
  const { variant } = props;
  const variantClass = POKEMON_TYPES[variant];

  function capitalize(s: string) {
    return (s && s[0].toUpperCase() + s.slice(1)) || "";
  }

  return (
    <span
      className={classNames(
        "rounded-full px-3 py-1 font-bold capitalize text-white",
        variantClass,
      )}
    >
      {capitalize(variant)}
    </span>
  );
};

export default PokemonTypeBadge;
