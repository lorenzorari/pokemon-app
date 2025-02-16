interface Props {
  trigger: number;
}

export function EvolutionTrigger({ trigger }: Props) {
  return <div className="z-10 rounded-md bg-gray-100 px-2 py-1">Level {trigger}</div>;
}
