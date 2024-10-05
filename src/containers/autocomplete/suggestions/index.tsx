import { cn } from 'src/utils/classnames';
import { PokemonAutocompleteItem } from '../types';

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
  return (
    <ul className="absolute top-[50%] z-[-1] w-full overflow-hidden rounded-b-2xl bg-white pt-6 shadow-sm">
      {suggestions.map((suggestion, i) => (
        <li
          key={i}
          className={cn(
            'cursor-pointer px-4 py-2 capitalize hover:bg-gray-100',
            suggestionSelected === i && 'bg-gray-100',
          )}
          onClick={() => onClickSuggestion!(suggestion)}
        >
          <span className="flex gap-2">
            <img
              src={suggestion.imageUrl}
              alt={suggestion.name}
              className="w-6"
            />
            <div>
              <span>{suggestion.name} </span>
              <span className="text-[10px] text-gray-400">
                #{suggestion.id}
              </span>
            </div>
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;
