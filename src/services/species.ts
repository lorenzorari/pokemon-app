import axios from 'axios';
import { convertUnderscoreToCamelcase } from 'src/helpers/utils/convert-underscore-to-camelcase';
import { Pokemon } from 'src/models/pokemon/index';
import { Species } from 'src/models/species';

const getSpecies = async ({ species }: Pokemon): Promise<Species> => {
  return axios.get(species.url).then(res => {
    const data = convertUnderscoreToCamelcase(res.data);
    return data as Species;
  });
};

export { getSpecies };
