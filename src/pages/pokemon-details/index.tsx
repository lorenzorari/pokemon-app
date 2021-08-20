import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ChainLink, ChainLinks } from '../../../models/evolution/chain';
import { Pokemon } from '../../../models/pokemon';
import { Species } from '../../../models/species';
import Button from '../../components/button';
import PokemonCard from '../../components/pokemon/card';
import PokemonDetailsBiography from '../../components/pokemon/details/biography';
import PokemonDetailsEvolutions from '../../components/pokemon/details/evolutions';
import PokemonDetailsStats from '../../components/pokemon/details/stats';
import Tab from '../../components/tab';
import { getEvolutionChain } from '../../services/evolution-chain';
import { getPokemon } from '../../services/pokemon';
import { getSpecies } from '../../services/species';
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
  const history = useHistory();
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
      const speciesData = await getSpecies(pokemonData);

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

  const addSimpleEvolution = ({ species }: ChainLink, array: Array<any>) => {
    array.push(createEvolution(species.url, species.name));
  };

  const addAlternateEvolutions = (
    chainLinks: ChainLinks,
    array: Array<any>
  ) => {
    const finalEvolutions: any = [];

    const alternateEvos = chainLinks.map(({ evolvesTo, species }) => {
      if (evolvesTo.length) addSimpleEvolution(evolvesTo[0], finalEvolutions);

      return createEvolution(species.url, species.name);
    });

    array.push(alternateEvos);
    finalEvolutions.length && array.push(finalEvolutions);
  };

  const getPokemonEvolutions = (chainLink: ChainLink) => {
    if (chainLink) {
      const { url, name } = chainLink.species; // First species

      const evolutions: any = [createEvolution(url, name)];

      let currentEvo = chainLink.evolvesTo;

      while (currentEvo.length) {
        if (currentEvo.length === 1) {
          addSimpleEvolution(currentEvo[0], evolutions);
          currentEvo = currentEvo[0].evolvesTo;
        }

        if (currentEvo.length > 1) {
          addAlternateEvolutions(currentEvo, evolutions);
          break;
        }
      }

      return evolutions;
    }

    return null;
  };

  useEffect(() => {
    const init = async () => {
      const { chain } = await getEvolutionChain(species);
      const evolutions = getPokemonEvolutions(chain);

      setPokemonEvolutions(evolutions);
    };

    species && init();
  }, [species]);

  const handleBackButton = () => {
    history.push('/');
  };

  return (
    <main className={styles.main}>
      {pokemon && (
        <>
          <div className={styles['basic-info-container']}>
            <Button theme="back" onClick={handleBackButton}>
              Back
            </Button>
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
