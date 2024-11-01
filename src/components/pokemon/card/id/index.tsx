import { zeroPad } from 'src/utils/zero-pad';

const PokemonCardId = ({ pokemon }: any) => {
  return (
    <div className="mb-2 text-lg font-light tracking-wider text-white">{`#${zeroPad(pokemon?.id, 3)}`}</div>
  );
};

export default PokemonCardId;
