import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SearchBar from 'src/components/search-bar';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import {
  NamedAPIResource,
  NamedAPIResources,
} from 'src/models/named-api-resource';
import AutocompleteError from './error';
import Suggestions from './suggestions';
import styles from './autocomplete.module.scss';

interface Props {
  dataToFilter?: NamedAPIResources;
  suggestionsSize?: number;
}

const Autocomplete = ({ dataToFilter, suggestionsSize = 4 }: Props) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<NamedAPIResources>([]);
  const [suggestionSelected, setSuggestionSelected] = useState<number>(-1);
  const [error, setError] = useState<string>('');

  const navigateToDetails = pokemonId => {
    history.push(`/pokemon/${pokemonId}`);
  };

  const reset = () => {
    setSuggestions([]);
    setSearchValue('');
    setError('');
  };

  const isValueValidated = (value: string) => {
    if (value === '') return false;

    if (!suggestions.length) {
      if (isNaN(+value)) setError(`${value} is not a Pokémon.`);
      else
        setError('No Pokémon has this id, please choose an id from 1 to 898.');

      return false;
    }

    if (suggestions[0] !== value) {
      setSuggestions([]);
      setError(`${value} is not a Pokémon`);
      return false;
    }

    return true;
  };

  const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    if (value.length === 0) return reset();

    if (error) setError('');

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
    if (!isValueValidated(value)) return;

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

      <AutocompleteError error={error} src="/assets/svg/cross.svg" />
    </form>
  );
};

export default Autocomplete;
