import { BaseComponentWithChildren } from 'src/models/utils';

interface PanelProps {
  title: string;
}

type Props = BaseComponentWithChildren<PanelProps>;

export const Panel = ({ title, children, className }: Props) => {
  return (
    <article className={className}>
      <h2 className="mb-4 text-[32px] font-bold">{title}</h2>
      {children}
    </article>
  );
};
