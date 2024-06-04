import styles from './title.module.scss';

const PokemonCardTitle = ({ pokemon }: any) => {
  return <h2 className={styles.title}>{pokemon?.name}</h2>;
};

export default PokemonCardTitle;
