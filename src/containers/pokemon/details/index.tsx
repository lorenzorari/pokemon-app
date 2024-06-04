import { useState } from 'react';
import PokemonDetailsTabs from 'src/containers/pokemon/details/tabs';
import styles from './details.module.scss';

const PokemonDetails = ({ defaultTab, tabs, tabContent }: any) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
    <div className={styles['details-container']}>
      <PokemonDetailsTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className={styles['tab-content']}>{tabContent[activeTab]}</div>
    </div>
  );
};

export default PokemonDetails;
