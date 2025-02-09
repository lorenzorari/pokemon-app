import { PanelField, PanelLabel } from 'src/components/ui/panel';
import { cn } from 'src/utils/classnames';
import { replaceDashesBySpaces } from 'src/utils/replace-dash-by-space';

export type StatField = {
  label: string;
  range: [number] | [number, number];
  rangeLimit?: number;
};

type Props = StatField;

export function StatField({ label, range, rangeLimit = 255 }: Props) {
  function calculateRangePercentage(value: number) {
    return (value / rangeLimit) * 100;
  }

  function getBgColor(value: number) {
    const ranges = [
      { max: 50, color: 'bg-red-500' },
      { max: 70, color: 'bg-yellow-500' },
      { max: 100, color: 'bg-green-500' },
      { max: 9999, color: 'bg-blue-500' },
    ];

    const match = ranges.find((range) => value < range.max);

    return match ? match.color : '';
  }

  return (
    <PanelField
      className={cn(
        'grid gap-3',
        range.length > 1
          ? 'grid-cols-[120px_1fr_70px]'
          : 'grid-cols-[120px_1fr_34px]',
      )}
    >
      <PanelLabel className={cn(label === 'hp' ? 'uppercase' : 'capitalize')}>
        {replaceDashesBySpaces(label)}
      </PanelLabel>
      <div className="flex items-center">
        <span className="relative block h-[10px] w-full overflow-hidden rounded-full bg-gray-200">
          {range.map((baseStat, index) => (
            <span
              key={index}
              className={cn(
                'absolute inset-y-0 block transition-all',
                index === 0 && 'z-10',
                index === 1 && 'opacity-30',
                getBgColor(baseStat),
              )}
              style={{ width: `${calculateRangePercentage(baseStat)}%` }}
            />
          ))}
        </span>
      </div>
      <div className="text-right">
        <span>{range.join(' - ')}</span>
      </div>
    </PanelField>
  );
}
