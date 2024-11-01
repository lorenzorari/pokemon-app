import { cn } from 'src/utils/classnames';
import { PokemonAutocompleteItem } from '../types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IconLoader } from '@tabler/icons-react';

interface Props {
  suggestions: PokemonAutocompleteItem[];
  suggestionSelected: number;
  onClickSuggestion?: (suggestion: PokemonAutocompleteItem) => void;
}

const Suggestions = ({
  suggestions,
  suggestionSelected,
  onClickSuggestion,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <ul className="absolute top-[50%] z-[-1] w-full overflow-hidden rounded-b-2xl bg-white pt-6 shadow-sm">
      {suggestions.map((suggestion, i) => (
        <li
          key={i}
          className={cn(
            'cursor-pointer px-4 py-2 first:border-t hover:bg-gray-100',
            suggestionSelected === i && 'bg-gray-100',
          )}
          onClick={() => onClickSuggestion!(suggestion)}
        >
          <Link to={`/pokemon/${suggestion.name}`} className="flex gap-2">
            <img
              src={suggestion.imageUrl}
              alt={suggestion.name}
              className={cn('w-6', !isImageLoaded && 'hidden')}
              onLoad={() => setIsImageLoaded(true)}
            />

            {!isImageLoaded && (
              <IconLoader className="animate-spin text-gray-300 [animation-duration:1.5s]" />
            )}

            <div>
              <span className="capitalize">{suggestion.name} </span>
              <span className="text-[10px] text-gray-400">
                #{suggestion.id}
              </span>
            </div>
          </Link>
        </li>
      ))}

      {!suggestions.length && (
        <li className="px-4 py-2 first:border-t">No results</li>
      )}
    </ul>
  );
};

export default Suggestions;
