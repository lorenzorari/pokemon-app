import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Button from 'src/components/button';
import Loading from 'src/components/loading';
import Modal from 'src/components/modal';
import PokemonCard from 'src/components/pokemon/card';
import PokemonDetailsBiography from 'src/components/pokemon/details/biography';
import PokemonDetailsEvolutions from 'src/components/pokemon/details/evolutions';
import PokemonDetailsStats from 'src/components/pokemon/details/stats';
import SearchBar from 'src/components/search-bar';
import Details from 'src/containers/details';
import useClickOutside from 'src/helpers/hooks/click-outside';
import { ChainLink, ChainLinks } from 'src/models/evolution/chain';
import { Pokemon } from 'src/models/pokemon';
import { Species } from 'src/models/species';
import { getEvolutionChain } from 'src/services/evolution-chain';
import { getPokemon } from 'src/services/pokemon';
import { getSpecies } from 'src/services/species';
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const searchModalRef = useRef(null);

  const tabs: string[] = [BIOGRAPHY, STATS, EVOLUTIONS];

  const tabContent = {
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
      className={styles.main}
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
            <Details
              defaultTab={BIOGRAPHY}
              tabs={tabs}
              tabContent={tabContent}
            />
          </section>
        </>
      ) : (
        <div className={styles['loading-container']}>
          <Loading src="/assets/svg/logo.svg" text={`Loading pokemon data`} />
        </div>
      )}
    </main>
  );
};

export default PokemonDetails;
