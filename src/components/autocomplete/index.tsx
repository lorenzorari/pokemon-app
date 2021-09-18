import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SearchBar from 'src/components/search-bar';
import { NamedAPIResources } from 'src/models/named-api-resource';
import { Pokemons } from 'src/models/pokemon';
import styles from './autocomplete.module.scss';

interface Props {
  dataToFilter?: Pokemons;
}

const Autocomplete = ({ dataToFilter }: Props) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionSelected, setSuggestionSelected] = useState<number>(-1);

  const reset = () => {
    setSuggestions([]);
    setSearchValue('');
  };

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (value.length === 0) return reset();

    const filteredData = dataToFilter.filter(({ name, id }) => {
      const nameLowercased = name.toLowerCase();
      const valueLowercased = value.toLowerCase();

      if (isNaN(+value)) return nameLowercased.includes(valueLowercased);

      return id.toString().includes(value);
    });

    setSuggestions(filteredData.slice(0, 4));
    setSearchValue(value);
    setSuggestionSelected(-1);
  };

  const navigateToDetails = pokemonId => {
    history.push(`/pokemon/${pokemonId}`);
  };

  const handleSubmit = async (value: string) => {
    if (value === '') return;

    if (suggestionSelected !== -1)
      return navigateToDetails(suggestions[suggestionSelected].name);

    navigateToDetails(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        if (suggestionSelected < suggestions.length - 1) {
          e.preventDefault();
          setSuggestionSelected(v => v + 1);
        }
        break;

      case 'ArrowUp':
        if (suggestionSelected >= 0) {
          e.preventDefault();
          setSuggestionSelected(v => v - 1);
        }
        break;

      case 'Enter':
        e.preventDefault();
        handleSubmit(searchValue);
    }
  };

  const handleClickSuggestion = id => {
    navigateToDetails(id);
  };

  return (
    <form className={styles.form}>
      <SearchBar
        type="text"
        className={styles['search-bar']}
        placeholder="Search a pokemon by name or id..."
        onChange={handleChangeSearch}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />

      <ul className={styles['suggestion-list']}>
        {suggestions.map((suggestion, i) => (
          <li
            key={i}
            className={suggestionSelected === i ? styles.selected : ''}
            onClick={() => handleClickSuggestion(suggestion.id)}
          >
            #{suggestion.id} {suggestion.name}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Autocomplete;
