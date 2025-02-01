import { Panel, PanelField, PanelLabel } from 'src/components/ui/panel';
import { cn } from 'src/utils/classnames';

export function Stats() {
  const stats = [
    { label: 'HP', value: 95 },
    { label: 'Attack', value: 65 },
    { label: 'Defense', value: 25 },
    { label: 'Special Attack', value: 110 },
    { label: 'Special Defense', value: 72 },
    { label: 'Speed', value: 66 },
  ];

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

  return (
    <Panel title="Stats" className="xl:col-span-2">
      {stats.map(({ label, value }) => (
        <PanelField className="grid grid-cols-[110px_1fr_64px] gap-3">
          <PanelLabel>{label}</PanelLabel>
          <div className="flex items-center">
            <span className="block h-[10px] w-full overflow-hidden rounded-full bg-gray-200">
              <span
                className={cn(
                  'block h-[10px] rounded-l-full',
                  getBgColor(value),
                )}
                style={{ width: `${calculateValue(value)}%` }}
              />
            </span>
          </div>
          <div className="text-right">
            <span className="font-bold">{value}</span>
            <span className="text-gray-400">/255</span>
          </div>
        </PanelField>
      ))}
    </Panel>
  );
}
