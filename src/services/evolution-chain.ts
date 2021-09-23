import axios from 'axios';
import { convertUnderscoreToCamelcase } from 'src/helpers/utils/convert-underscore-to-camelcase';
import { EvolutionChain } from 'src/models/evolution/chain';
import { Species } from 'src/models/species/index';

const getEvolutionChain = async ({
  evolutionChain,
}: Species): Promise<EvolutionChain> => {
  return axios.get(evolutionChain.url).then(res => {
    const data = convertUnderscoreToCamelcase(res.data);
    return data as EvolutionChain;
  });
};

export { getEvolutionChain };
