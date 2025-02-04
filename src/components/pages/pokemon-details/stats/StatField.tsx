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

  // function calculateStats(
  //   isHP: boolean,
  //   base: number,
  //   level = 100,
  //   iv = IV.MAX,
  //   ev = EV.MAX,
  //   nature: number = NATURE.NORMAL,
  // ) {
  //   const bonus = isHP ? level + 10 : 5;
  //   const natureValue = isHP ? 1 : nature;

  //   return Math.floor(
  //     (((2 * base + iv + ev / 4) * level) / 100 + bonus) * natureValue,
  //   );
  // }

  // function calculateMinStats(isHP: boolean, base: number) {
  //   return calculateStats(isHP, base, 50, IV.MIN, EV.MIN, NATURE.LOW);
  // }

  // function calculateMaxStats(isHP: boolean, base: number) {
  //   return calculateStats(isHP, base, 50, IV.MAX, EV.MAX, NATURE.HIGH);
  // }

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
              className={cn(
                'absolute inset-y-0 block',
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
      {/* <div className="text-right">
          <span>
            {calculateMinStats(label === 'hp', baseStat)}-
            {calculateMaxStats(label === 'hp', baseStat)}
          </span>
        </div> */}
    </PanelField>
  );
}
