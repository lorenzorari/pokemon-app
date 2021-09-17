import React, { useState } from 'react';
import Tab from 'src/components/tab';
import styles from './details.module.scss';

const Details = ({ defaultTab, tabs, tabContent }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab);

  return (
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

      <div className={styles['tab-content']}>{tabContent[activeTab]}</div>
    </div>
  );
};

export default Details;
