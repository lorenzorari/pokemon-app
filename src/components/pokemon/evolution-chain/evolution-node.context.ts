import { createContext, useContext } from 'react';
import { EvolutionDetail } from 'src/models/evolution/detail';

type EvolutionNodeContext = {
  details: EvolutionDetail[];
};

export const EvolutionNodeCtx = createContext<EvolutionNodeContext>({
  details: [],
});

export const useEvolutionNode = () => useContext(EvolutionNodeCtx);
