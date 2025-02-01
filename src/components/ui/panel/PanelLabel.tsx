import { BaseComponentWithChildren } from 'src/models/utils';
import { cn } from 'src/utils/classnames';

type Props = BaseComponentWithChildren;

export const PanelLabel = ({ children, className }: Props) => {
  return <span className={cn('text-gray-400', className)}>{children}</span>;
};
