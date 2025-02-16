import { EvolutionNode } from 'src/components/pokemon/evolution-chain';
import { Panel } from 'src/components/ui/panel';
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
    <Panel className="mb-10" title="Evolution Chain">
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

        {/* <div className="relative">
          <article className="flex rounded-lg bg-gray-100 p-3 text-lg font-bold">
            <picture className="block size-[48px]"></picture>
            Pichu
          </article>

          <div className="absolute -left-24 top-1/2 flex w-24 -translate-y-1/2 justify-center">
            <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500 before:absolute before:inset-x-[2px] before:inset-y-1/2 before:-z-10 before:h-[2px] before:-translate-y-1/2 before:rounded-full before:bg-gray-100">
              Level 16
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="flex rounded-lg bg-gray-100 p-3 text-lg font-bold">
            <picture className="block size-[48px]"></picture>
            Pichu
          </div>

          <div className="absolute -left-24 top-1/2 flex w-24 -translate-y-1/2 justify-center">
            <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500 before:absolute before:inset-x-[2px] before:inset-y-1/2 before:-z-10 before:h-[2px] before:-translate-y-1/2 before:rounded-full before:bg-gray-100">
              Level 16
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="grid grid-cols-3 gap-24">
        <EvolutionNode title="Pichuu" />

        <div className="relative">
          <article className="flex rounded-lg bg-gray-100 p-3 text-lg font-bold">
            <picture className="block size-[48px]"></picture>
            Pichu
          </article>

          <div className="absolute -left-24 top-1/2 flex w-24 -translate-y-1/2 justify-center">
            <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500 before:absolute before:inset-x-[2px] before:inset-y-1/2 before:-z-10 before:h-[2px] before:-translate-y-1/2 before:rounded-full before:bg-gray-100">
              Level 16
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="flex rounded-lg bg-gray-100 p-3 text-lg font-bold">
            <picture className="block size-[48px]"></picture>
            Pichu
          </div>

          <div className="absolute -left-24 top-1/2 flex w-24 -translate-y-1/2 justify-center">
            <div className="rounded-md bg-gray-100 px-2 py-1 text-sm font-bold text-gray-500 before:absolute before:inset-x-[2px] before:inset-y-1/2 before:-z-10 before:h-[2px] before:-translate-y-1/2 before:rounded-full before:bg-gray-100">
              Level 16
            </div>
          </div>
        </div>
      </div> */}
    </Panel>
  );
}
