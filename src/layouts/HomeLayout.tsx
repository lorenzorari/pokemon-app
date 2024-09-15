import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export function HomeLayout({ children }: Props) {
  return (
    <>
      <Navbar isHome />
      <main className="mx-auto -mt-[80px]">{children}</main>
    </>
  );
}
