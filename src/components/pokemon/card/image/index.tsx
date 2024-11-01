import { getArtworkUrl } from 'src/helpers/get-artwork-url';

const PokemonCardImage = ({ pokemon }: any) => {
  return <img src={pokemon && getArtworkUrl(pokemon.id)} alt={pokemon?.name} />;
};

export default PokemonCardImage;
