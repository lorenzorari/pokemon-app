import { Nullable } from 'src/models/utils';
import { EvolutionTrigger } from './EvolutionTrigger';

interface Props {
  trigger?: Nullable<number>;
}

export function EvolutionConnector({ trigger }: Props) {
  return (
    <div className="absolute -left-24 top-0 flex h-full w-24 items-center bg-red-500 after:absolute after:inset-x-[2px] after:h-[2px] after:rounded-full after:bg-gray-100">
      <div className="relative flex size-full items-center justify-center">
        {trigger && <EvolutionTrigger trigger={trigger} />}
      </div>
    </div>
  );
}
