import { createContext, useContext } from 'react';

export type PokemonCounter = number | undefined;

type Context = {
  pokemonCount?: PokemonCounter;
  setPokemonCount: React.Dispatch<React.SetStateAction<PokemonCounter>>;
};

export const PokemonCounterContext = createContext<Context>({
  pokemonCount: undefined,
  setPokemonCount: () => {},
});

export const usePokemonCounter = () => useContext(PokemonCounterContext);
