import { useState } from 'react';

export type Tab<T> = {
  label: string;
  value: T;
  onClick?: () => void;
};

export function useTabs<T>(tabs: Tab<T>[], initialTab?: T) {
  const [activeTab, setActiveTab] = useState<T>(initialTab ?? tabs[0].value);

  return {
    activeTab,
    setActiveTab,
    tabs,
  };
}
