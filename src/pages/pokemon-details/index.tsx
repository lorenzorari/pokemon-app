import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ChainLink, ChainLinks } from '../../models/evolution/chain';
import { Pokemon } from '../../models/pokemon';
import { Species } from '../../models/species';
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
import Loading from '../../components/loading';
import { ReactSVG } from 'react-svg';
import SearchBar from '../../components/search-bar';
import useClickOutside from '../../helpers/hooks/click-outside';
import Modal from 'src/components/modal';

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
  const [activeTab, setActiveTab] = useState<string>(BIOGRAPHY);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const searchModalRef = useRef(null);

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

  useClickOutside(searchModalRef, () => setIsSearchModalOpen(false));

  useEffect(() => {
    const init = async () => {
      const pokemonData = await getPokemon(id);
      const speciesData = await getSpecies(pokemonData);

      setPokemon(pokemonData);
      setSpecies(speciesData);
      setIsLoading(false);
    };

    init();
  }, [id]);

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

  const handleSearchIcon = e => {
    e.stopPropagation();
    setIsSearchModalOpen(true);
  };

  const handlePokemonSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const searchPokemon = async (value: string) => {
    if (value === '') return;

    history.push(`/pokemon/${value}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPokemon(searchValue);
      setIsSearchModalOpen(false);
      setSearchValue('');
    }
  };

  return (
    <main
      style={{ overflowY: isSearchModalOpen ? 'auto' : 'scroll' }}
      className={styles.layout}
    >
      {!isLoading ? (
        <>
          <Button
            className={styles['btn-back']}
            theme="back"
            onClick={handleBackButton}
          >
            Back
          </Button>

          <section className={styles['card-container']}>
            <PokemonCard className={styles.card} pokemon={pokemon} />

            <div className={styles.options}>
              <ReactSVG
                className={styles['option-search']}
                src="/assets/svg/search.svg"
                onClick={handleSearchIcon}
              />
            </div>
          </section>

          <Modal className={styles['search-modal']} isOpen={isSearchModalOpen}>
            <SearchBar
              ref={searchModalRef}
              className={styles.search}
              type="text"
              placeholder="Search a pokemon by name or id..."
              onChange={handlePokemonSearch}
              onKeyPress={handleKeyPress}
              value={searchValue}
            />
          </Modal>

          <section className={styles.details}>
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

              <div className={styles['tab-content']}>{tabView[activeTab]}</div>
            </div>
          </section>
        </>
      ) : (
        <section className={styles['loading-container']}>
          <Loading src="/assets/svg/logo.svg" text={`Loading pokemon data`} />
        </section>
      )}
    </main>
  );
};

export default PokemonDetails;
