import PokemonTypeBadge from 'src/components/PokemonTypeBadge';
import { getArtworkUrl } from 'src/helpers/get-artwork-url';
import { Pokemon } from 'src/models/pokemon';
import PokemonDetailHeroImage from './HeroImage';
import InfoTile from 'src/components/info-tile/InfoTile';
import { PokemonType } from 'src/models/types';
import { getPokemonNumber } from 'src/helpers/getPokemonNumber';

interface Props {
  pokemon: Pokemon;
  pokemonTypes: PokemonType[];
  description: string;
  genus: string;
}

const PokemonDetailHero = ({
  pokemon,
  pokemonTypes,
  description,
  genus,
}: Props) => {
  const pokemonNumber = getPokemonNumber(pokemon?.id);

  return (
    <section className="relative h-[690px] overflow-x-clip px-5 py-4 md:flex md:max-h-[500px] md:w-full md:items-center md:justify-between md:gap-2 lg:max-h-[820px] lg:min-h-[760px] lg:px-10 xl:px-32">
      <div>
        <div className="max-w-96">
          <div className="flex gap-2">
            {pokemonTypes.map((type) => (
              <PokemonTypeBadge key={type} variant={type} withLabel />
            ))}
          </div>
          <h1 className="mb-4 mt-3 text-5xl font-bold lg:text-7xl">
            {pokemon?.name}
          </h1>
          <h2 className="text-4xl font-light md:mb-10 lg:text-5xl">
            {pokemonNumber}
          </h2>
          <p className="mb-6 hidden md:block">{description}</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 mb-20 grid grid-cols-3 gap-2 px-5 md:static md:inset-auto md:mb-0 md:w-full md:max-w-96 md:px-0">
          <InfoTile title="Height" text={`${pokemon.height} m`} />
          <InfoTile title="Weight" text={`${pokemon.weight} kg`} />
          <InfoTile title="Species" text={`${genus}`} />
        </div>
      </div>

      <div className="relative sm:mx-auto md:mx-0 md:pr-10 lg:pr-16 lg:pt-11">
        <div className="absolute -right-2 top-0 sm:static sm:inset-auto">
          <PokemonDetailHeroImage
            pokemonType={pokemonTypes[0]}
            imageSrc={getArtworkUrl(pokemon?.id ?? 0)}
            imageAlt={pokemon?.name}
          />
        </div>
      </div>
    </section>
  );
};

export default PokemonDetailHero;
