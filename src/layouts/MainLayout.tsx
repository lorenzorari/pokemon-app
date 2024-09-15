import { Navbar } from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mx-auto 2xl:max-w-[1440px]">{children}</main>
    </>
  );
}
