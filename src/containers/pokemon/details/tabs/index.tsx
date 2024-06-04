import { Dispatch, SetStateAction } from 'react';
import Tab from 'src/components/tab';
import styles from './tabs.module.scss';

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}

const PokemonDetailsTabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <nav>
      <ul className={styles.tabs}>
        {tabs.map((tab, i) => (
          <Tab key={i} onClick={() => setActiveTab(tab)} isActive={activeTab === tab}>
            {tab}
          </Tab>
        ))}
      </ul>
    </nav>
  );
};

export default PokemonDetailsTabs;
