import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SearchBar from 'src/components/search-bar';
import styles from './autocomplete.module.scss';

const Autocomplete = ({ dataToFilter }) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (value.length > 0) {
      const filteredData: string[] = dataToFilter.filter((item: string) =>
        item.toLowerCase().includes(value.toLowerCase())
      );

      setSuggestions(filteredData.slice(0, 4));
    }

    setSearchValue(value);
  };

  const search = async (value: string) => {
    if (value === '') return;

    history.push(`/pokemon/${value}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      search(searchValue);
    }
  };

  return (
    <form className={styles.form}>
      <SearchBar
        type="text"
        className={styles['search-bar']}
        placeholder="Search a pokemon by name or id..."
        onChange={handleChangeSearch}
        onKeyPress={handleKeyPress}
      />

      <ul className={styles['suggestion-list']}>
        {suggestions.map((suggestion, i) => (
          <li key={i}>{suggestion}</li>
        ))}
      </ul>
    </form>
  );
};

export default Autocomplete;
