import { IconBrandGithub } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { SVG } from "src/components/SVG";
import { cn } from "src/utils/classnames";

interface Props {
  isHome?: boolean;
}

export const Navbar = ({ isHome }: Props) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 mx-auto border-b border-b-[#ffffff4d] px-32 py-6 backdrop-blur-lg 2xl:max-w-[1440px]",
        { "relative border-none backdrop-blur-0": isHome },
      )}
    >
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-2xl font-bold"
        >
          <SVG
            className={cn("size-8", { "fill-white": isHome })}
            src="/assets/svg/logo.svg"
          />
          {isHome ? null : "Pocketex"}
        </Link>

        <ul className={cn("flex items-center gap-4", { "text-white": isHome })}>
          <li>
            <Link
              to="/explore"
              className="text-sm underline-offset-4 hover:underline"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              target="_blank"
              to={{ pathname: "https://github.com/lorenzorari/pocketex" }}
              className="text-sm underline-offset-4 hover:underline"
            >
              <IconBrandGithub
                className={cn(
                  "text-gray-300 transition-colors hover:text-black",
                  { "text-white/60 hover:text-white": isHome },
                )}
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
