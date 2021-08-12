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

      if (currentEvo.evolvesTo.length === 1) {
        while (currentEvo.evolvesTo.length > 0) {
          const nextEvo = currentEvo.evolvesTo[0];
          const { url, name } = nextEvo.species;

          evolutions.push({ id: getIdFromSpeciesResourceUrl(url), name });

          currentEvo = nextEvo;
        }
      }

      if (currentEvo.evolvesTo.length > 1) {
        const alternateEvos = currentEvo.evolvesTo.map(evo => ({
          id: getIdFromSpeciesResourceUrl(evo.species.url),
          name: evo.species.name,
        }));

        evolutions.push(alternateEvos);
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
