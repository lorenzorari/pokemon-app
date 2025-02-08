import { getPokemonNumber } from 'src/helpers/getPokemonNumber';

const PokemonCardId = ({ pokemon }: any) => {
  const pokemonNumber = getPokemonNumber(pokemon?.id);

  return (
    <div className="mb-2 text-lg font-light tracking-wider text-white">
      {pokemonNumber}
    </div>
  );
};

export default PokemonCardId;
