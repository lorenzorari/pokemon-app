import { ReactNode } from 'react';
import { PanelField } from '../ui/panel/PanelField';
import { PanelLabel } from '../ui/panel/PanelLabel';

interface Props {
  label: string;
  children: ReactNode;
}

export const DetailField = ({ label, children }: Props) => {
  return (
    <PanelField className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-[170px_1fr]">
      <PanelLabel>{label}</PanelLabel>
      <span className="capitalize">{children}</span>
    </PanelField>
  );
};
