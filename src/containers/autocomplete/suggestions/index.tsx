import { getIdFromResourceUrl } from "src/helpers/get-id-from-resource-url";
import {
  NamedAPIResource,
  NamedAPIResources,
} from "src/models/named-api-resource";
import { cn } from "src/utils/classnames";

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
    <ul className="absolute w-full overflow-hidden rounded-b-xl border-t bg-white shadow-sm">
      {suggestions.map((suggestion, i) => (
        <li
          key={i}
          className={cn(
            "px-4 py-2 capitalize",
            suggestionSelected === i && "bg-gray-100",
          )}
          onClick={() => onClickSuggestion!(suggestion)}
        >
          {suggestion.name}{" "}
          <span className="text-[10px] text-gray-400">
            #{getIdFromResourceUrl(suggestion.url!)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;
