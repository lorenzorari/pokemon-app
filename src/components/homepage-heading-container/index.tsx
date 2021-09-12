import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Particles, { Main } from 'react-tsparticles';
import tsparticlesOptions from '../../data/tsparticlesOptions';
import particlesOptions from '../../data/tsparticlesOptions';
import ScrollIcon from '../scroll-icon';
import SearchBar from '../search-bar';
import HomepageHeading from './heading';
import styles from './homepage-heading-container.module.scss';

interface Props {
  scrollToRef?: React.MutableRefObject<any>;
  particlesLoaded?: boolean;
  setAreParticlesLoading?: any;
}

const HomepageHeadingContainer = ({
  scrollToRef,
  particlesLoaded,
  setAreParticlesLoading,
}: Props) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

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
    }
  };

  const scrollTo = () => {
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const initParticles = (tsParticles: Main) => {
    tsParticles
      .load('tsparticles', tsparticlesOptions)
      .then(() => setAreParticlesLoading(false));
  };

  return (
    <section
      className={
        particlesLoaded ? styles['homepage-heading-container'] : styles.hidden
      }
    >
      <Particles
        className={styles.particles}
        init={initParticles}
        options={particlesOptions}
      />

      <div className={styles['heading-content']}>
        <HomepageHeading title="Pocketex" />

        <form>
          <SearchBar
            type="text"
            placeholder="Search a pokemon by name or id..."
            onChange={handlePokemonSearch}
            onKeyPress={handleKeyPress}
          />
        </form>
      </div>

      <ScrollIcon
        className={styles['scroll-icon']}
        onClick={scrollTo}
        src="/assets/svg/arrow.svg"
      />
    </section>
  );
};

export default HomepageHeadingContainer;
