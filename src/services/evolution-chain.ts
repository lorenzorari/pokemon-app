import axios from 'axios';
import { EvolutionChain } from './../models/evolution/chain';
import { Species } from './../models/species/index';
import { convertUnderscoreToCamelcase } from './../utils/convert-underscore-to-camelcase';

const getEvolutionChain = async ({
  evolutionChain,
}: Species): Promise<EvolutionChain> => {
  return new Promise(resolve =>
    axios.get(evolutionChain.url).then(res => {
      const data = convertUnderscoreToCamelcase(res.data);
      return resolve(data as EvolutionChain);
    })
  );
};

export { getEvolutionChain };
