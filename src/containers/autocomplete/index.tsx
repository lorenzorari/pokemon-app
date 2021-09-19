import classNames from 'classnames';
import React, { forwardRef, MutableRefObject, useState } from 'react';
import { useHistory } from 'react-router';
import SearchBar from 'src/components/search-bar';
import { POKEMON_QUANTITY } from 'src/constants';
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
  className?: string;
  placeholder?: string;
}

const Autocomplete = forwardRef(
  (
    { dataToFilter, suggestionsSize = 4, className, placeholder }: Props,
    ref?: MutableRefObject<any>
  ) => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState<NamedAPIResources>([]);
    const [suggestionSelected, setSuggestionSelected] = useState<number>(-1);
    const [error, setError] = useState<string>('');

    const navigateToDetails = (pokemonId: string | number) => {
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
          setError(
            `No Pokémon has this id, please choose an id from 1 to ${POKEMON_QUANTITY}.`
          );

        return false;
      }

      const { name, url } = suggestions[0];
      const id = getIdFromResourceUrl(url).toString();

      if (suggestionSelected === -1 && name !== value && id !== value) {
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
      <form className={classNames(styles.form, className)}>
        <SearchBar
          ref={ref}
          type="text"
          placeholder={placeholder}
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
  }
);

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
