import humps from 'humps';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ChainLink, ChainLinks } from '../../../models/evolution/chain';
import { Pokemon } from '../../../models/pokemon';
import { Species } from '../../../models/species';
import PokemonCard from '../../components/pokemon/card/card';
import PokemonDetailsBiography from '../../components/pokemon/details/biography';
import PokemonDetailsEvolutions from '../../components/pokemon/details/evolutions';
import PokemonDetailsStats from '../../components/pokemon/details/stats';
import Tab from '../../components/tab';
import { getPokemon } from '../../services/pokemon';
import styles from './pokemon-details.module.scss';

interface Params {
  id: string;
}

const BIOGRAPHY = 'Biography';
const STATS = 'Stats';
const EVOLUTIONS = 'Evolutions';

const getIdFromSpeciesResourceUrl = (url: string) => {
  return +url.split('/').slice(-2)[0];
};

const PokemonDetails = () => {
  const { id } = useParams<Params>();
  const [pokemon, setPokemon] = useState<Pokemon>(null);
  const [species, setSpecies] = useState<Species>(null);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  const [activeTab, setActiveTab] = useState<string>(EVOLUTIONS);

  const tabs: string[] = [BIOGRAPHY, STATS, EVOLUTIONS];

  const tabView = {
    [BIOGRAPHY]: species && (
      <PokemonDetailsBiography pokemon={pokemon} species={species} />
    ),
    [STATS]: <PokemonDetailsStats pokemon={pokemon} />,
    [EVOLUTIONS]: pokemonEvolutions.length > 0 && (
      <PokemonDetailsEvolutions pokemonEvolutions={pokemonEvolutions} />
    ),
  };

  useEffect(() => {
    const init = async () => {
      const pokemonData = await getPokemon(id);

      const speciesData = await new Promise(resolve => {
        fetch(pokemonData.species.url)
          .then(res => res.json())
          .then(res => {
            const data = humps.camelizeKeys(res);
            return resolve(data as Species);
          });
      });

      setPokemon(pokemonData);
      setSpecies(speciesData);
    };

    init();
  }, []);

  const createEvolution = (url, name) => {
    return {
      id: getIdFromSpeciesResourceUrl(url),
      name,
    };
  };

  const addSimpleEvolution = ({ evolvesTo }: ChainLink, array: Array<any>) => {
    const { url, name } = evolvesTo[0].species;
    array.push(createEvolution(url, name));
  };

  const addAlternateEvolutions = (
    chainLinks: ChainLinks,
    array: Array<any>
  ) => {
    const finalEvolutions: any = [];

    const alternateEvos = chainLinks.map(altEvo => {
      const { evolvesTo, species } = altEvo;

      if (evolvesTo.length) addSimpleEvolution(altEvo, finalEvolutions);

      return createEvolution(species.url, species.name);
    });

    array.push(alternateEvos);
    finalEvolutions.length && array.push(finalEvolutions);
  };

  const getPokemonEvolutions = (chainLink: ChainLink) => {
    if (chainLink) {
      const { url, name } = chainLink.species; // First species

      const evolutions: any = [createEvolution(url, name)];

      let nextEvos = chainLink.evolvesTo;

      while (nextEvos.length) {
        if (nextEvos.length === 1) {
          addSimpleEvolution(nextEvos[0], evolutions);
          nextEvos = nextEvos[0].evolvesTo;
        }

        if (nextEvos.length > 1) {
          addAlternateEvolutions(nextEvos, evolutions);
          break;
        }
      }

      return evolutions;
    }

    return null;
  };

  useEffect(() => {
    const init = async () => {
      const { chain }: any = await new Promise(resolve => {
        fetch(species.evolutionChain.url)
          .then(res => res.json())
          .then(res => {
            const data = humps.camelizeKeys(res);
            return resolve(data);
          });
      });

      const evolutions = getPokemonEvolutions(chain);
      setPokemonEvolutions(evolutions);
    };

    species && init();
  }, [species]);

  return (
    <main className={styles.main}>
      {pokemon && (
        <>
          <div className={styles['basic-info-container']}>
            <PokemonCard pokemon={pokemon} />
          </div>

          <div className={styles.details}>
            <div className={styles['details-container']}>
              <ul className={styles['details-tabs']}>
                {tabs.map((tab, i) => (
                  <Tab
                    key={i}
                    onClick={() => setActiveTab(tab)}
                    isActive={activeTab === tab}
                  >
                    {tab}
                  </Tab>
                ))}
              </ul>

              {tabView[activeTab]}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default PokemonDetails;
