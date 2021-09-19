import React from 'react';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import {
  NamedAPIResource,
  NamedAPIResources,
} from 'src/models/named-api-resource';
import styles from './suggestions.module.scss';

interface Props {
  suggestions: NamedAPIResources;
  suggestionSelected: number;
  onClickSuggestion?: (suggestion: NamedAPIResource) => void;
}

const Suggestions = ({
  suggestions,
  suggestionSelected,
  onClickSuggestion,
}: Props) => {
  return (
    <ul className={styles['suggestions']}>
      {suggestions.map((suggestion, i) => (
        <li
          key={i}
          className={suggestionSelected === i ? styles.selected : ''}
          onClick={() => onClickSuggestion(suggestion)}
        >
          {suggestion.name} <span>#{getIdFromResourceUrl(suggestion.url)}</span>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;
