import { useState } from 'react';
import { StatField } from 'src/features/pokemon-details/components/stats';
import { Pokemon } from 'src/models/pokemon';
import { capitalize } from 'src/utils/capitalize';
import { replaceDashesBySpaces } from 'src/utils/replace-dash-by-space';
import { Tab, useTabs } from 'src/hooks/useTabs';

const IV = {
  MIN: 0,
  MAX: 31,
};
const EV = {
  MIN: 0,
  MAX: 252,
};
const NATURE = {
  LOW: 0.9,
  NORMAL: 1,
  HIGH: 1.1,
};

enum StatTab {
  Base = 'base',
  Level50 = 'level-50',
  Level100 = 'level-100',
}

export function useStats(stats: NonNullable<Pokemon['stats']>) {
  const [statFields, setStatFields] = useState<StatField[]>(getBaseStats());
  const { activeTab, setActiveTab, tabs } = useTabs<StatTab>(initTabs());

  function initTabs(): Tab<StatTab>[] {
    return [
      ...Object.values(StatTab).map((tab) => ({
        label: replaceDashesBySpaces(capitalize(tab)),
        value: tab,
        onClick: () => handleTabClick(tab, +tab.split('-')[1]),
      })),
    ];
  }

  function getBaseStats() {
    return stats.map((stat) => {
      return {
        label: stat.stat?.name ?? '',
        range: [stat.baseStat ?? 0],
      } as StatField;
    });
  }

  function calculateStats(
    isHP: boolean,
    base: number,
    level = 100,
    iv = IV.MAX,
    ev = EV.MAX,
    nature: number = NATURE.NORMAL,
  ) {
    const bonus = isHP ? level + 10 : 5;
    const natureValue = isHP ? 1 : nature;

    return Math.floor(
      (((2 * base + iv + ev / 4) * level) / 100 + bonus) * natureValue,
    );
  }

  function calculateMinStats(isHP: boolean, base: number, level: number) {
    return calculateStats(isHP, base, level, IV.MIN, EV.MIN, NATURE.LOW);
  }

  function calculateMaxStats(isHP: boolean, base: number, level: number) {
    return calculateStats(isHP, base, level, IV.MAX, EV.MAX, NATURE.HIGH);
  }

  function handleTabClick(tabName: StatTab, level?: number) {
    setActiveTab(tabName);

    if (!level) return setStatFields(getBaseStats());

    const newStatFields = stats.map((stat) => {
      const isHP = stat.stat?.name === 'hp';

      return {
        label: stat.stat?.name ?? '',
        range: [
          calculateMinStats(isHP, stat.baseStat ?? 0, level),
          calculateMaxStats(isHP, stat.baseStat ?? 0, level),
        ],
        rangeLimit: 800,
      } as StatField;
    });

    setStatFields(newStatFields);
  }

  function calculateStatSum() {
    return stats.reduce((a, b) => a + (b?.baseStat ?? 0), 0);
  }

  return {
    statFields,
    handleTabClick,
    calculateStatSum,
    statTabs: tabs,
    activeTab,
  };
}
