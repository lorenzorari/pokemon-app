import { Panel, PanelField, PanelLabel } from 'src/components/ui/panel';
import { Pokemon } from 'src/models/pokemon';
import { cn } from 'src/utils/classnames';
import { replaceDashesBySpaces } from 'src/utils/replace-dash-by-space';

interface Props {
  stats: NonNullable<Pokemon['stats']>;
}

export function Stats({ stats }: Props) {
  // const stats = [
  //   { label: 'HP', value: 103 },
  //   { label: 'Attack', value: 93 },
  //   { label: 'Defense', value: 67 },
  //   { label: 'Special Attack', value: 71 },
  //   { label: 'Special Defense', value: 61 },
  //   { label: 'Speed', value: 84 },
  // ];

  function calculateValue(value: number) {
    return (value / 255) * 100;
  }

  function getBgColor(value: number) {
    const ranges = [
      { max: 50, color: 'bg-red-500' },
      { max: 70, color: 'bg-yellow-500' },
      { max: 100, color: 'bg-green-500' },
      { max: 255, color: 'bg-blue-500' },
    ];

    const match = ranges.find((range) => value < range.max);

    return match ? match.color : '';
  }

  function calculateStats(
    isHP: boolean,
    base: number,
    level = 100,
    iv = 31,
    ev = 252,
    nature = 1,
  ) {
    // const

    return Math.floor((((2 * base + iv + ev / 4) * level) / 100 + 5) * nature);
  }

  function calculateStatSum() {
    return stats.reduce((a, b) => a + (b?.baseStat ?? 0), 0);
  }

  return (
    <Panel title="Stats" className="xl:col-span-2">
      {stats.map(
        ({ baseStat, stat }) =>
          baseStat && (
            <PanelField className="grid grid-cols-[120px_1fr_34px] gap-3">
              <PanelLabel
                className={cn(stat?.name === 'hp' ? 'uppercase' : 'capitalize')}
              >
                {replaceDashesBySpaces(stat?.name ?? '')}
              </PanelLabel>
              <div className="flex items-center">
                <span className="block h-[10px] w-full overflow-hidden rounded-full bg-gray-200">
                  <span
                    className={cn('block h-[10px]', getBgColor(baseStat))}
                    style={{ width: `${calculateValue(baseStat)}%` }}
                  />
                </span>
              </div>
              <div className="text-right">
                <span>{baseStat}</span>
              </div>
            </PanelField>
          ),
      )}
      <PanelField className="flex justify-end gap-3">
        <PanelLabel>Total</PanelLabel>
        <div className="w-[34px] text-right">
          <span className="font-bold">{calculateStatSum()}</span>
        </div>
      </PanelField>
    </Panel>
  );
}
