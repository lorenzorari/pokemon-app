import { Image } from 'src/components/ui/Image';
import { getArtworkUrl } from 'src/helpers/get-artwork-url';
import { getIdFromResourceUrl } from 'src/helpers/get-id-from-resource-url';
import { EvolutionDetail } from 'src/models/evolution/detail';
import { NamedAPIResource } from 'src/models/named-api-resource';
import { Root } from '@radix-ui/react-select';
import { EvolutionConnector } from './EvolutionConnector';
import { EvolutionTrigger } from './EvolutionTrigger';
import { EvolutionNodeCtx } from './evolution-node.context';

type Props = NamedAPIResource & { details?: EvolutionDetail[] } & {
  hasParent?: boolean;
};

export function EvolutionNode({ name, url, details, hasParent = true }: Props) {
  const pokemonId = getIdFromResourceUrl(url);
  const imageUrl = getArtworkUrl(pokemonId);
  const Tag = hasParent ? 'div' : Root;

  return (
    <EvolutionNodeCtx.Provider value={{ details: details || [] }}>
      <Tag className={hasParent ? 'relative' : undefined}>
        <a href={`/pokemon/${name}`}>
          <article className="flex items-center gap-2 rounded-lg bg-gray-100 p-3 text-lg font-bold transition-all hover:bg-gray-200">
            <picture className="block size-[48px] text-xs">
              <Image src={imageUrl} alt={name} />
            </picture>
            <h3 className="capitalize">{name}</h3>
          </article>
        </a>
        {hasParent && (
          <EvolutionConnector>
            <EvolutionTrigger />
          </EvolutionConnector>
        )}
      </Tag>
    </EvolutionNodeCtx.Provider>
  );
}
