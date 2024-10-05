import { IconSearch } from "@tabler/icons-react";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { cn } from "src/utils/classnames";

interface Props {
  className?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<any>;
  onKeyPress?: KeyboardEventHandler<any>;
  onKeyDown?: KeyboardEventHandler<any>;
}

const SearchBar = (props: Props) => {
  return (
    <div
      className={cn(
        "flex items-center rounded-full bg-white pr-4 transition-all",
        props.className,
      )}
    >
      <input
        className="w-full rounded-[inherit] bg-transparent py-2 pl-4 outline-none"
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        onKeyDown={props.onKeyDown}
        value={props.value}
      />

      <IconSearch className="w-5" />
    </div>
  );
};
export default SearchBar;
