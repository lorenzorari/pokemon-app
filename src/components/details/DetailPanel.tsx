import { type ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export const DetailPanel = ({ title, children }: Props) => {
  return (
    <article className="max-w-[340px]">
      <h2 className="mb-4 text-[32px] font-bold">{title}</h2>
      {children}
    </article>
  );
};
