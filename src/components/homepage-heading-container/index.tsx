import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ReactSVG } from 'react-svg';
import Particles, { Main } from 'react-tsparticles';
import particlesOptions from '../../data/tsparticlesOptions';
import ScrollIcon from '../scroll-icon';
import SearchBar from '../search-bar';
import HomepageHeading from './heading';
import styles from './homepage-heading-container.module.scss';

interface Props {
  scrollToRef?: React.MutableRefObject<any>;
  areParticlesLoading?: boolean;
  initParticles?: (tsParticles: Main) => void;
}

const HomepageHeadingContainer = ({
  scrollToRef,
  areParticlesLoading,
  initParticles,
}: Props) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');

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

  return (
    <section
      className={
        areParticlesLoading === true
          ? styles.hidden
          : styles['homepage-heading-container']
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

      <a
        rel="noreferrer"
        href="https://github.com/lorenzorari/pocketex"
        target="_blank"
        aria-label="Github link"
      >
        <ReactSVG
          className={styles['github-logo']}
          src="/assets/svg/github.svg"
        />
      </a>

      <ScrollIcon
        className={styles['scroll-icon']}
        onClick={scrollTo}
        src="/assets/svg/arrow.svg"
      />
    </section>
  );
};

export default HomepageHeadingContainer;
