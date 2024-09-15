import { ChangeEventHandler, forwardRef, KeyboardEventHandler } from "react";
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

const SearchBar = forwardRef(
  (props: Props, ref?: React.LegacyRef<HTMLDivElement> | undefined) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center rounded-[24px] bg-white pr-4 transition-all",
          props.value && "rounded-bl-none rounded-br-none",
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

        <figure>
          <img src="/assets/svg/search.svg" />
        </figure>
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
