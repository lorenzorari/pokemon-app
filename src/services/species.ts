import { Pokemon } from './../../models/pokemon/index';
import { Species } from '../../models/species';
import humps from 'humps';

const getSpecies = async ({ species }: Pokemon): Promise<Species> => {
  return new Promise(resolve => {
    fetch(species.url)
      .then(res => res.json())
      .then(res => {
        const data = humps.camelizeKeys(res);
        return resolve(data as Species);
      });
  });
};

export { getSpecies };
