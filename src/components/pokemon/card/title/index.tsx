const PokemonCardTitle = ({ pokemon }: any) => {
  return <h2 className="text-lg font-bold text-white">{pokemon?.name}</h2>;
};

export default PokemonCardTitle;
