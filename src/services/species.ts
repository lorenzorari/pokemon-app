import axios from 'axios';
import { Species } from '../models/species';
import { Pokemon } from './../models/pokemon/index';
import { convertUnderscoreToCamelcase } from '../helpers/utils/convert-underscore-to-camelcase';

const getSpecies = async ({ species }: Pokemon): Promise<Species> => {
  return new Promise(resolve =>
    axios.get(species.url).then(res => {
      const data = convertUnderscoreToCamelcase(res.data);
      return resolve(data as Species);
    })
  );
};

export { getSpecies };
