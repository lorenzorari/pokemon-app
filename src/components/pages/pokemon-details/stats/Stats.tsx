import { Button, ButtonVariant } from 'src/components/ui/Button';
import { Panel, PanelField, PanelLabel } from 'src/components/ui/panel';
import { Pokemon } from 'src/models/pokemon';
import { StatField } from './StatField';
import { useState } from 'react';

interface Props {
  stats: NonNullable<Pokemon['stats']>;
}

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

export function Stats({ stats }: Props) {
  const [statFields, setStatFields] = useState<StatField[]>(getBaseStats());

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

  function handleTabClick(level?: number) {
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

  return (
    <Panel title="Stats" className="xl:col-span-2">
      <div className="mb-4 flex gap-2">
        <Button variant={ButtonVariant.Dark} onClick={() => handleTabClick()}>
          Base
        </Button>
        <Button
          variant={ButtonVariant.Outline}
          onClick={() => handleTabClick(50)}
        >
          Level 50
        </Button>
        <Button
          variant={ButtonVariant.Outline}
          onClick={() => handleTabClick(100)}
        >
          Level 100
        </Button>
      </div>

      {statFields.map(({ label, range, rangeLimit }) => (
        <StatField
          key={label}
          label={label}
          range={range}
          rangeLimit={rangeLimit}
        />
      ))}
      {statFields[0].range.length === 1 && (
        <PanelField className="flex justify-end gap-3">
          <PanelLabel>Total</PanelLabel>
          <div className="w-[34px] text-right">
            <span className="font-bold">{calculateStatSum()}</span>
          </div>
        </PanelField>
      )}
    </Panel>
  );
}
