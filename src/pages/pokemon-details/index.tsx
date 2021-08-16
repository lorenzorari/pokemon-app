import humps from 'humps';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
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

  const getPokemonEvolutions = evolutionChain => {
    if (evolutionChain) {
      const { url, name } = evolutionChain.species; // First species

      const evolutions = [
        {
          id: getIdFromSpeciesResourceUrl(url),
          name,
        },
      ];

      let currentEvo = evolutionChain;

      while (currentEvo.evolvesTo.length) {
        const nextEvos = currentEvo.evolvesTo;

        if (nextEvos.length === 1) {
          const { url, name } = nextEvos[0].species;

          evolutions.push({ id: getIdFromSpeciesResourceUrl(url), name });

          currentEvo = nextEvos[0];
        }

        if (nextEvos.length > 1) {
          const finalEvolution: any = [];

          const alternateEvos = nextEvos.map(({ evolvesTo, species }) => {
            if (evolvesTo.length) {
              const { url, name } = evolvesTo[0].species;

              finalEvolution.push({
                id: getIdFromSpeciesResourceUrl(url),
                name,
              });
            }

            return {
              id: getIdFromSpeciesResourceUrl(species.url),
              name: species.name,
            };
          });

          evolutions.push(alternateEvos);
          finalEvolution.length && evolutions.push(finalEvolution);

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
