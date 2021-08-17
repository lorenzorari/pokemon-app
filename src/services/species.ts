import axios from 'axios';
import humps from 'humps';
import { Species } from '../../models/species';
import { Pokemon } from './../../models/pokemon/index';

const getSpecies = async ({ species }: Pokemon): Promise<Species> => {
  return new Promise(resolve =>
    axios.get(species.url).then(res => {
      const data = humps.camelizeKeys(res.data);
      return resolve(data as Species);
    })
  );
};

export { getSpecies };
