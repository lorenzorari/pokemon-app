import React from 'react';
import { getArtworkUrl } from '../../../helpers/get-artwork-url';
import { zeroPad } from '../../../libs/utils/zero-pad';
import './card.scss';

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="card">
      <h2 className="card__title">{pokemon?.name}</h2>

      <div className="card__number">{`#${zeroPad(pokemon?.id, 3)}`}</div>

      <figure className="card__figure">
        <img
          className="card__figure__image"
          src={pokemon && getArtworkUrl(pokemon)}
          alt={pokemon?.name}
        />
      </figure>

      <div className="card__type-container">
        <div className="card__type">{pokemon?.types[0].type.name}</div>
      </div>
    </div>
  );
};

export default PokemonCard;
