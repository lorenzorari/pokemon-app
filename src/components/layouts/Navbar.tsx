import { Link } from "react-router-dom";
import { SVG } from "src/components/SVG";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 mx-auto border-b border-b-[#ffffff4d] px-32 py-6 backdrop-blur-lg 2xl:max-w-[1440px]">
      <nav>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-2xl font-bold"
        >
          <SVG className="size-8" src="/assets/svg/logo.svg" />
          Pocketex
        </Link>
      </nav>
    </header>
  );
};
