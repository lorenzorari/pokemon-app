import humps from 'humps';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Pokemon } from '../../../models/pokemon';
import { Species } from '../../../models/species';
import PokemonCard from '../../components/pokemon/card/card';
import PokemonDetailsBiography from '../../components/pokemon/details/biography';
import PokemonDetailsStats from '../../components/pokemon/details/stats';
import Tab from '../../components/tab';
import { getPokemon } from '../../services/pokemon';
import styles from './pokemon-details.module.scss';

interface Params {
  id: string;
}

const BIOGRAPHY = 'Biography';
const STATS = 'Stats';
const EVOLUTIONS = 'Evolutions';

const PokemonDetails = () => {
  const { id } = useParams<Params>();
  const [pokemon, setPokemon] = useState<Pokemon>(null);
  const [species, setSpecies] = useState<Species>(null);
  const [activeTab, setActiveTab] = useState<string>(STATS);

  const tabs: string[] = [BIOGRAPHY, STATS, EVOLUTIONS];

  // const pokemonType = pokemon?.types[0].type.name;

  // const style = {
  //   '--color-type-1': `var(--color-${pokemonType}-1)`,
  //   '--color-type-2': `var(--color-${pokemonType}-2)`,
  // } as React.CSSProperties;

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

          <div className={styles.details}>
            <div className={styles['details-container']}>
              <ul className={styles['details-tabs']}>
                {tabs.map((tab, i) => (
                  <Tab
                    key={i}
                    onClick={() => setActiveTab(tab)}
                    isActive={activeTab === tab}
                  >
                    {tab}
                  </Tab>
                ))}
              </ul>

              {tabView[activeTab]}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default PokemonDetails;
