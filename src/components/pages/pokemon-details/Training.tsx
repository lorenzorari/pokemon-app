import { useMemo } from "react";
import { DetailField, DetailPanel } from "src/components/details";
import { Pokemon } from "src/models/pokemon";
import { Species } from "src/models/species";
import { replaceDashesBySpaces } from "src/utils/replace-dash-by-space";

interface Props {
  pokemon: Pokemon;
  species: Species;
}

export const Training = ({ pokemon, species }: Props) => {
  const evYields = useMemo(
    () => pokemon.stats?.filter((stat) => (stat.effort ?? -1) > 0),
    [pokemon],
  );

  return (
    <DetailPanel title="Catch & Training">
      <section>
        <DetailField label="Catch Rate">{species?.captureRate}</DetailField>
        <DetailField label="Base Happiness">
          {species.baseHappiness}
        </DetailField>
        <DetailField label="Growth Rate">
          {replaceDashesBySpaces(species?.growthRate?.name ?? "")}
        </DetailField>
        <DetailField label="EV Yield">
          <ul>
            {evYields?.map((evYield) => (
              <li>
                {evYield.effort}{" "}
                {replaceDashesBySpaces(evYield.stat?.name ?? "")}
              </li>
            ))}
          </ul>
        </DetailField>
      </section>
    </DetailPanel>
  );
};
