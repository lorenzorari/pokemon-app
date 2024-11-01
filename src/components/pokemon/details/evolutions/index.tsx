import { useHistory } from 'react-router';
import PokemonEvolution from 'src/components/pokemon/evolution';
import styles from './evolutions.module.scss';

const PokemonDetailsEvolutions = ({ pokemonEvolutions }: any) => {
  const history = useHistory();

  const handleClick = (evolution: any) => {
    history.push(`/pokemon/${evolution.id}`);
  };

  return (
    <ul className={styles['evolutions-container']}>
      {pokemonEvolutions.map((evo: any) => {
        return (
          <li key={evo.id}>
            <div className={styles['line-container']}>
              <hr />
            </div>

            {Array.isArray(evo) ? (
              evo.map((alternateEvo) => (
                <PokemonEvolution
                  key={alternateEvo.id}
                  evolution={alternateEvo}
                  onClick={() => handleClick(alternateEvo)}
                />
              ))
            ) : (
              <PokemonEvolution
                evolution={evo}
                onClick={() => handleClick(evo)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default PokemonDetailsEvolutions;
