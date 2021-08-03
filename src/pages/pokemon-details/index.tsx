import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ReactSVG } from 'react-svg';
import { Pokemon } from '../../../models/pokemon';
import PokemonCardId from '../../components/pokemon/card/id';
import PokemonCardImage from '../../components/pokemon/card/image';
import PokemonCardTitle from '../../components/pokemon/card/title';
import PokemonDetailsBiography from '../../components/pokemon/details/biography';
import Tab from '../../components/tab';
import TypeTag from '../../components/type-tag';
import { getPokemon } from '../../services/pokemon';
import { Species } from '../../../models/species';
import styles from './pokemon-details.module.scss';
import humps from 'humps';
import PokemonDetailsStats from '../../components/pokemon/details/stats/stats';
import PokemonCard from '../../components/pokemon/card/card';

interface Params {
  id: string;
}

const BIOGRAPHY = 'biography';
const STATS = 'stats';
const EVOLUTIONS = 'evolutions';

const PokemonDetails = () => {
  const { id } = useParams<Params>();
  const [pokemon, setPokemon] = useState<Pokemon>(null);
  const [species, setSpecies] = useState<Species>(null);
  const [activeTab, setActiveTab] = useState<string>(STATS);

  // const pokemonType = pokemon?.types[0].type.name;

  // const style = {
  //   '--color-type-1': `var(--color-${pokemonType}-1)`,
  //   '--color-type-2': `var(--color-${pokemonType}-2)`,
  // } as React.CSSProperties;

  const styleTypeTag = {
    padding: '.5rem',
    margin: '.5rem .5rem 0 0',
  };

  const tabView = {
    [BIOGRAPHY]: species && (
      <PokemonDetailsBiography pokemon={pokemon} species={species} />
    ),
    [STATS]: <PokemonDetailsStats pokemon={pokemon} />,
  };

  useEffect(() => {
    const init = async () => {
      const pokemonData = await getPokemon(id);

      const speciesData = await new Promise(resolve => {
        fetch(pokemonData.species.url)
          .then(res => res.json())
          .then(res => {
            const data = humps.camelizeKeys(res);
            return resolve(data as Species);
          });
      });

      setPokemon(pokemonData);
      setSpecies(speciesData);
    };

    init();
  }, []);

  return (
    <main className={styles.main}>
      {pokemon && (
        <>
          <div className={styles['basic-info-container']}>
            <PokemonCard pokemon={pokemon} />
          </div>

          <div className={styles['details-container']}>
            <ul className={styles['details-tabs']}>
              <Tab
                onClick={() => setActiveTab(BIOGRAPHY)}
                isActive={activeTab === BIOGRAPHY}
              >
                Biography
              </Tab>
              <Tab
                onClick={() => setActiveTab(STATS)}
                isActive={activeTab === STATS}
              >
                Stats
              </Tab>
              <Tab
                onClick={() => setActiveTab(EVOLUTIONS)}
                isActive={activeTab === EVOLUTIONS}
              >
                Evolutions
              </Tab>
            </ul>

            {tabView[activeTab]}
          </div>
        </>
      )}
    </main>
  );
};

export default PokemonDetails;
