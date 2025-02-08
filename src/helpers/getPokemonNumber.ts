import { Maybe } from 'src/models/utils';
import { zeroPad } from 'src/utils/zero-pad';

export function getPokemonNumber(id: Maybe<number>) {
  return `#${zeroPad(id ?? 0, 4)}`;
}
