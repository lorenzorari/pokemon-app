import { Link } from "react-router-dom";
import { SVG } from "src/components/SVG";

export const Navbar = () => {
  return (
    <header className="sticky top-0 mx-auto max-w-[1440px] border-b border-b-[#ffffff4d] px-32 py-6 backdrop-blur-lg">
      <nav>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-3xl font-bold"
        >
          <SVG className="h-10 w-10" src="/assets/svg/logo.svg" />
          Pocketex
        </Link>
      </nav>
    </header>
  );
};
