import { Image } from 'src/components/ui/Image';
import { getArtworkUrl } from 'src/helpers/get-artwork-url';

const PokemonCardImage = ({ pokemon }: any) => {
  return (
    <Image src={pokemon && getArtworkUrl(pokemon.id)} alt={pokemon?.name} />
  );
};

export default PokemonCardImage;
