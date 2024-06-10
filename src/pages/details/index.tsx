import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import Button from 'src/components/button';
import Loading from 'src/components/loading';
import Modal from 'src/components/modal';
import { POKEMON_QUANTITY } from 'src/constants';
import Autocomplete from 'src/containers/autocomplete';
import PokemonCard from 'src/containers/pokemon/card';
import PokemonDetails from 'src/containers/pokemon/details';
import PokemonDetailsBiography from 'src/containers/pokemon/details/biography';
import PokemonDetailsEvolutions from 'src/containers/pokemon/details/evolutions';
import PokemonDetailsStats from 'src/containers/pokemon/details/stats';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { useClickOutside } from 'src/hooks/click-outside';
import { ChainLink, ChainLinks } from 'src/models/evolution/chain';
import { NamedAPIResources } from 'src/models/named-api-resource';
import { Pokemon } from 'src/models/pokemon';
import { Species } from 'src/models/species';
import { getEvolutionChain } from 'src/services/evolution-chain';
import { getAllPokemons, getPokemon } from 'src/services/pokemon';
import { getSpecies } from 'src/services/species';
import styles from './details.module.scss';

interface Params {
  id: string;
}

const BIOGRAPHY = 'Biography';
const STATS = 'Stats';
const EVOLUTIONS = 'Evolutions';

const DetailsPage = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<Species | null>(null);
  const [allPokemonResources, setAllPokemonResources] = useState<NamedAPIResources>([]);
  const [pokemonEvolutions, setPokemonEvolutions] = useState([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);
  const [isLoadingResources, setIsLoadingResources] = useState<boolean>(true);
  const [isLoadingEvolutions, setIsLoadingEvolutions] = useState<boolean>(true);
  const isLoading: boolean = isLoadingPokemon || isLoadingResources || isLoadingEvolutions;

  const searchModalRef = useRef(null);

  const tabs: string[] = [BIOGRAPHY, STATS, EVOLUTIONS];

  const tabContent = {
    [BIOGRAPHY]: species && <PokemonDetailsBiography pokemon={pokemon!} species={species} />,
    [STATS]: <PokemonDetailsStats pokemon={pokemon!} />,
    [EVOLUTIONS]: pokemonEvolutions.length > 0 && (
      <PokemonDetailsEvolutions pokemonEvolutions={pokemonEvolutions} />
    ),
  };

  useClickOutside(searchModalRef, () => setIsSearchModalOpen(false));

  useEffect(() => {
    const initAllPokemonResources = async () => {
      const { results } = await getAllPokemons(undefined, POKEMON_QUANTITY);

      setAllPokemonResources(results!);
      setIsLoadingResources(false);
    };

    initAllPokemonResources();
  }, []);

  useEffect(() => {
    const initPokemon = async () => {
      setIsSearchModalOpen(false);
      setIsLoadingPokemon(true);

      try {
        const pokemonData: any = await getPokemon(id);
        const speciesData = await getSpecies(pokemonData);

        setPokemon(pokemonData);
        setSpecies(speciesData);
      } catch (err) {
        history.push('/');
      }

      setIsLoadingPokemon(false);
    };

    initPokemon();
  }, [id]);

  useEffect(() => {
    const initEvolutions = async () => {
      setIsLoadingEvolutions(true);
      const { chain } = await getEvolutionChain(species!);
      const evolutions = getPokemonEvolutions(chain!);

      setPokemonEvolutions(evolutions);
      setIsLoadingEvolutions(false);
    };

    species && initEvolutions();
  }, [species]);

  const createEvolution = (url: string, name: string) => {
    return {
      id: getIdFromResourceUrl(url),
      name,
    };
  };

  const addSimpleEvolution = ({ species }: ChainLink, array: Array<any>) => {
    array.push(createEvolution(species.url!, species.name!));
  };

  const addAlternateEvolutions = (chainLinks: ChainLinks, array: Array<any>) => {
    const finalEvolutions: any = [];

    const alternateEvos = chainLinks.map(({ evolvesTo, species }) => {
      if (evolvesTo.length) addSimpleEvolution(evolvesTo[0], finalEvolutions);

      return createEvolution(species.url!, species.name!);
    });

    array.push(alternateEvos);
    finalEvolutions.length && array.push(finalEvolutions);
  };

  const getPokemonEvolutions = (chainLink: ChainLink) => {
    if (chainLink) {
      const { url, name } = chainLink.species; // First species

      const evolutions: any = [createEvolution(url!, name!)];

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

  const handleBackButton = () => {
    history.push('/');
  };

  const handleSearchIcon = (e: any) => {
    e.stopPropagation();
    setIsSearchModalOpen(true);
  };

  return (
    <main className={styles.main}>
      {!isLoading ? (
        <>
          <Button className={styles['btn-back']} theme="back" onClick={handleBackButton}>
            Back
          </Button>

          <section className={styles['card-container']}>
            <PokemonCard className={styles.card} pokemon={pokemon!} />

            <div className={styles.options}>
              <ReactSVG
                className={styles['option-search']}
                src="/assets/svg/search.svg"
                onClick={handleSearchIcon}
              />
            </div>
          </section>

          <Modal className={styles['search-modal']} isOpen={isSearchModalOpen}>
            <Autocomplete
              ref={searchModalRef}
              className={styles.autocomplete}
              placeholder="Search a pokemon by name or id..."
              suggestionsSize={10}
              dataToFilter={allPokemonResources}
            />
          </Modal>

          <section className={styles.details}>
            <PokemonDetails defaultTab={BIOGRAPHY} tabs={tabs} tabContent={tabContent} />
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

export default DetailsPage;
