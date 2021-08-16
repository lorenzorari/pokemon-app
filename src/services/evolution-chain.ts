import { EvolutionChain } from './../../models/evolution/chain';
import { Species } from './../../models/species/index';
import humps from 'humps';

const getEvolutionChain = async ({
  evolutionChain,
}: Species): Promise<EvolutionChain> => {
  return new Promise(resolve => {
    fetch(evolutionChain.url)
      .then(res => res.json())
      .then(res => {
        const data = humps.camelizeKeys(res);
        return resolve(data as EvolutionChain);
      });
  });
};

export { getEvolutionChain };
