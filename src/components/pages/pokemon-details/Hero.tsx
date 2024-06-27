import PokemonTypeBadge from "src/components/PokemonTypeBadge";
import { PokemonType } from "src/components/PokemonTypeBadge/PokemonTypeBadge";
import { getArtworkUrl } from "src/helpers/get-artwork-url";
import { Pokemon } from "src/models/pokemon";
import { zeroPad } from "src/utils/zero-pad";
import PokemonDetailHeroImage from "./HeroImage";

interface Props {
  pokemon: Pokemon;
  pokemonType: PokemonType;
  description: string;
}

const PokemonDetailHero = ({ pokemon, pokemonType, description }: Props) => {
  return (
    <section className="flex h-[calc(100vh-95.5px)] w-full items-center justify-between gap-2 overflow-x-clip px-32 py-4">
      <div className="max-w-96">
        <PokemonTypeBadge variant={pokemonType} />
        <h1 className="mb-4 mt-3 text-7xl font-bold capitalize">
          {pokemon?.name}
        </h1>
        <h2 className="mb-10 text-5xl font-light">{`#${zeroPad(pokemon?.id ?? 0, 3)}`}</h2>
        <p>{description}</p>
      </div>

      <div className="relative flex items-center justify-center">
        <PokemonDetailHeroImage
          pokemonType={pokemonType}
          imageSrc={getArtworkUrl(pokemon?.id ?? 0)}
          imageAlt={pokemon?.name}
        />
      </div>
    </section>
  );
};

export default PokemonDetailHero;
