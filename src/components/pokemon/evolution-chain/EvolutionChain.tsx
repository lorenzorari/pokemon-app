import { EvolutionNode } from 'src/components/pokemon/evolution-chain';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { Optional } from 'src/models/utils';
import { getEvolutionChain } from 'src/services/evolution-chain';
import useSWR from 'swr';

interface Props {
  evolutionChainUrl: Optional<string>;
}

export function EvolutionChain({ evolutionChainUrl }: Props) {
  const { data } = useSWR(getEvolutionChainKey(), getEvolutionChain);

  function getEvolutionChainKey() {
    if (!evolutionChainUrl) throw new Error('No evolution chain url');

    const evolutionChainId = getIdFromResourceUrl(evolutionChainUrl);

    return `evolution-chain/${evolutionChainId}`;
  }

  if (!evolutionChainUrl) return null;

  return (
    <div className="grid grid-cols-3 gap-24">
      {data?.chain && <EvolutionNode {...data.chain.species} hasParent={false} />}

      <div className="col-span-2 grid gap-0">
        {data?.chain?.evolvesTo?.map((evo2) => (
          <div className="grid grid-cols-2 gap-24" key={evo2.species.url}>
            <EvolutionNode {...evo2.species} details={evo2.evolutionDetails} />

            <div className="grid gap-5">
              {evo2.evolvesTo.map((evo3) => (
                <EvolutionNode key={evo3.species.url} {...evo3.species} details={evo3.evolutionDetails} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
