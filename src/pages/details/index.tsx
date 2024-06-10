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
import { useClickOutside } from 'src/hooks/click-outside';
import { NamedAPIResources } from 'src/models/named-api-resource';
import { getAllPokemons } from 'src/services/pokemon';
import styles from './details.module.scss';
import { usePokemon } from 'src/hooks/pokemon/usePokemon';
import { usePokemonSpecies } from 'src/hooks/pokemon/usePokemonSpecies';
import { usePokemonEvolutions } from 'src/hooks/pokemon/usePokemonEvolutions';

interface Params {
  id: string;
}

const BIOGRAPHY = 'Biography';
const STATS = 'Stats';
const EVOLUTIONS = 'Evolutions';

const DetailsPage = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { pokemon, isPokemonLoading } = usePokemon(id);
  const { pokemonSpecies: species } = usePokemonSpecies(id);
  const { pokemonEvolutions, arePokemonEvolutionsLoading } = usePokemonEvolutions(id);

  const [allPokemonResources, setAllPokemonResources] = useState<NamedAPIResources>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const [isLoadingResources, setIsLoadingResources] = useState<boolean>(true);
  const isLoading: boolean = isPokemonLoading || isLoadingResources || arePokemonEvolutionsLoading;

  const searchModalRef = useRef(null);

  const tabs: string[] = [BIOGRAPHY, STATS, EVOLUTIONS];

  const tabContent = {
    [BIOGRAPHY]: species && <PokemonDetailsBiography pokemon={pokemon!} species={species} />,
    [STATS]: <PokemonDetailsStats pokemon={pokemon!} />,
    [EVOLUTIONS]: pokemonEvolutions?.length > 0 && (
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
    };

    initPokemon();
  }, [id]);

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
