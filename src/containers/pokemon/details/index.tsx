import React, { useState } from 'react';
import DetailsTabs from 'src/containers/pokemon/details/tabs';
import styles from './details.module.scss';

const PokemonDetails = ({ defaultTab, tabs, tabContent }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
    <div className={styles['details-container']}>
      <DetailsTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className={styles['tab-content']}>{tabContent[activeTab]}</div>
    </div>
  );
};

export default PokemonDetails;
