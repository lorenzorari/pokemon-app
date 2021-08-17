import { EvolutionChain } from './../../models/evolution/chain';
import { Species } from './../../models/species/index';
import humps from 'humps';
import axios from 'axios';

const getEvolutionChain = async ({
  evolutionChain,
}: Species): Promise<EvolutionChain> => {
  return new Promise(resolve =>
    axios.get(evolutionChain.url).then(res => {
      const data = humps.camelizeKeys(res.data);
      return resolve(data as EvolutionChain);
    })
  );
};

export { getEvolutionChain };
