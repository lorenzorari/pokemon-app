import { ReactNode } from 'react';

interface Props {
  label: string;
  children: ReactNode;
}

export const DetailField = ({ label, children }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-b-gray-200 py-[10px] last:border-b-0 sm:grid-cols-2 md:grid-cols-[170px_1fr]">
      <span className="text-gray-400">{label}</span>
      <span className="capitalize">{children}</span>
    </div>
  );
};
