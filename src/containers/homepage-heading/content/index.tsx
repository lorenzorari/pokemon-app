import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SearchBar from 'src/components/search-bar';
import HomepageHeadingContentHeading from 'src/containers/homepage-heading/content/heading';
import styles from './content.module.scss';

interface Props {
  heading: string;
}

const HomepageHeadingContent = ({ heading }: Props) => {
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

  return (
    <div className={styles['content']}>
      <HomepageHeadingContentHeading value={heading} />

      <form>
        <SearchBar
          type="text"
          placeholder="Search a pokemon by name or id..."
          onChange={handlePokemonSearch}
          onKeyPress={handleKeyPress}
        />
      </form>
    </div>
  );
};

export default HomepageHeadingContent;
