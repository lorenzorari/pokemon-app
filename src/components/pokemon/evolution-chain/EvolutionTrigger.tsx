import { useEvolutionNode } from './evolution-node.context';

export function EvolutionTrigger() {
  const { details } = useEvolutionNode();

  const trigger = details?.[0].minLevel || null;

  if (!trigger) return null;

  return <div className="z-10 rounded-md bg-gray-100 px-2 py-1">Level {trigger}</div>;
}
