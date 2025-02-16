import { EvolutionChain } from 'src/components/pokemon/evolution-chain/EvolutionChain';
import { Panel } from 'src/components/ui/panel';
import { Optional } from 'src/models/utils';

interface Props {
  evolutionChainUrl: Optional<string>;
}

export function EvolutionChainPanel({ evolutionChainUrl }: Props) {
  if (!evolutionChainUrl) return null;

  return (
    <Panel className="mb-10" title="Evolution Chain">
      <EvolutionChain evolutionChainUrl={evolutionChainUrl} />
    </Panel>
  );
}
