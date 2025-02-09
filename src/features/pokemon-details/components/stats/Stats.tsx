import { Button, ButtonVariant } from 'src/components/ui/Button';
import { Panel, PanelField, PanelLabel } from 'src/components/ui/panel';
import { Pokemon } from 'src/models/pokemon';
import { StatField } from './StatField';
import { useStats } from 'src/features/pokemon-details/components/stats/useStats';

interface Props {
  stats: NonNullable<Pokemon['stats']>;
}

export function Stats({ stats }: Props) {
  const { statFields, statTabs, activeTab, calculateStatSum } = useStats(stats);

  return (
    <Panel title="Stats" className="xl:col-span-2">
      <div className="mb-4 flex gap-2">
        {statTabs.map((tab) => (
          <Button
            key={tab.value}
            variant={
              activeTab === tab.value
                ? ButtonVariant.Dark
                : ButtonVariant.Outline
            }
            onClick={tab.onClick}
          >
            {tab.label}
          </Button>
        ))}
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
