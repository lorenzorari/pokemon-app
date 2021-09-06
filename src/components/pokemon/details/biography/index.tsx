import React from 'react';
import { Pokemon } from '../../../../models/pokemon';
import { Species } from '../../../../models/species';
import PokemonDescription from '../../description';
import PokemonInformation from '../../information';
import styles from './biography.module.scss';

interface Props {
  pokemon: Pokemon;
  species: Species;
}

const PokemonDetailsBiography = ({ pokemon, species }: Props) => {
  const getDescription = () => {
    const text = species.flavorTextEntries.find(
      ({ language }) => language.name === 'en'
    ).flavorText;

    return text
      .replace(/u'\f'/, ' ')
      .replace(/\u00AD/g, '')
      .replace(/\u000C/g, ' ')
      .replace(/u' -\n'/, ' - ')
      .replace(/u'-\n'/, '-')
      .replace(/(\r\n|\n|\r)/gm, ' ');
  };

  const getSpecies = () => {
    return species.genera.find(({ language }) => language.name === 'en').genus;
  };

  const getAnthropometry = (value: number) => {
    return (value / 10).toFixed(1);
  };

  const getGender = () => {
    switch (species.genderRate) {
      case -1:
        return 'Genderless';

      case 0:
        return 'Male only';

      case 8:
        return 'Female only';

      default:
        return 'Male & Female';
    }
  };

  return (
    <>
      <PokemonDescription>{getDescription()}</PokemonDescription>

      <ul className={styles['info-container']}>
        <PokemonInformation title="Species">{getSpecies()}</PokemonInformation>

        <PokemonInformation title="Height">
          {getAnthropometry(pokemon.height)} m
        </PokemonInformation>

        <PokemonInformation title="Weight">
          {getAnthropometry(pokemon.weight)} kg
        </PokemonInformation>

        <PokemonInformation title="Abilities">content</PokemonInformation>

        <PokemonInformation title="Gender">{getGender()}</PokemonInformation>
      </ul>
    </>
  );
};

export default PokemonDetailsBiography;
