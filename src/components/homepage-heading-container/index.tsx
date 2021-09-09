import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import particlesOptions from '../../data/particlesOptions';
import ScrollIcon from '../scroll-icon';
import SearchBar from '../search-bar';
import HomepageHeading from './heading';
import styles from './homepage-heading-container.module.scss';

const HomepageHeadingContainer = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePokemonSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const searchPokemon = async (value: string) => {
    if (value === '') {
      // const { results } = await getAllPokemons(INITIAL_URL);
      // setIsLoading(true);
      // await loadPokemons(results);
      // setIsLoading(false);
      // return;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPokemon(searchValue);
    }
  };

  return (
    <div className={styles['homepage-heading-container']}>
      <Particles className={styles.particles} options={particlesOptions} />

      <div className={styles['heading-content']}>
        <HomepageHeading />

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
        src="/assets/svg/arrow.svg"
      />
    </div>
  );
};

export default HomepageHeadingContainer;
