import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SearchBar from 'src/components/search-bar';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import {
  NamedAPIResource,
  NamedAPIResources,
} from 'src/models/named-api-resource';
import styles from './autocomplete.module.scss';
import Suggestions from './suggestions';

interface Props {
  dataToFilter?: NamedAPIResources;
  suggestionsSize?: number;
}

const Autocomplete = ({ dataToFilter, suggestionsSize = 4 }: Props) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<NamedAPIResources>([]);
  const [suggestionSelected, setSuggestionSelected] = useState<number>(-1);

  const navigateToDetails = pokemonId => {
    history.push(`/pokemon/${pokemonId}`);
  };

  const reset = () => {
    setSuggestions([]);
    setSearchValue('');
  };

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (value.length === 0) return reset();

    const filteredData = dataToFilter.filter(({ name, url }) => {
      const nameLowercased = name.toLowerCase();
      const valueLowercased = value.toLowerCase();

      if (isNaN(+value)) return nameLowercased.includes(valueLowercased);

      const id = getIdFromResourceUrl(url);

      return id.toString().includes(value);
    });

    setSuggestions(filteredData.slice(0, suggestionsSize));
    setSearchValue(value);
    setSuggestionSelected(-1);
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

  const handleClickSuggestion = (suggestion: NamedAPIResource) => {
    const id = getIdFromResourceUrl(suggestion.url);
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

      <Suggestions
        suggestions={suggestions}
        suggestionSelected={suggestionSelected}
        onClickSuggestion={handleClickSuggestion}
      />
    </form>
  );
};

export default Autocomplete;
