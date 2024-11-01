import { SVG } from 'src/components/SVG';

interface Props {
  pokemonType: string;
}

const PokemonBackgroundImage = ({ pokemonType }: Props) => {
  return (
    <div className="absolute -bottom-[2.4rem] -right-12 left-10 -z-[1]">
      <SVG
        className="size-full"
        style={{ color: 'var(--color-type-2)' }}
        src={`/assets/svg/pokemon-types/${pokemonType}.svg`}
      />
    </div>
  );
};

export default PokemonBackgroundImage;
