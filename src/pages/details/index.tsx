import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { POKEMON_QUANTITY } from "src/constants";
import PokemonDetailsBiography from "src/containers/pokemon/details/biography";
import PokemonDetailsEvolutions from "src/containers/pokemon/details/evolutions";
import PokemonDetailsStats from "src/containers/pokemon/details/stats";
import { useClickOutside } from "src/hooks/click-outside";
import { NamedAPIResources } from "src/models/named-api-resource";
import { getAllPokemons } from "src/services/pokemon";
import { usePokemon } from "src/hooks/pokemon/usePokemon";
import { usePokemonSpecies } from "src/hooks/pokemon/usePokemonSpecies";
import { usePokemonEvolutions } from "src/hooks/pokemon/usePokemonEvolutions";
import PokemonDetailHero from "src/components/pages/pokemon-details/Hero";
import { Navbar } from "src/components/layouts/Navbar";

interface Params {
  id: string;
}

const BIOGRAPHY = "Biography";
const STATS = "Stats";
const EVOLUTIONS = "Evolutions";

const DetailsPage = () => {
  const { id } = useParams<Params>();
  const { pokemon, isPokemonLoading } = usePokemon(id);
  const { pokemonSpecies: species, getGenus } = usePokemonSpecies(id);
  const { pokemonEvolutions, arePokemonEvolutionsLoading } =
    usePokemonEvolutions(id);

  const [allPokemonResources, setAllPokemonResources] =
    useState<NamedAPIResources>([]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  const [isLoadingResources, setIsLoadingResources] = useState<boolean>(true);
  const isLoading: boolean =
    isPokemonLoading || isLoadingResources || arePokemonEvolutionsLoading;

  const searchModalRef = useRef(null);

  const tabs: string[] = [BIOGRAPHY, STATS, EVOLUTIONS];

  const tabContent = {
    [BIOGRAPHY]: species && (
      <PokemonDetailsBiography pokemon={pokemon!} species={species} />
    ),
    [STATS]: <PokemonDetailsStats pokemon={pokemon!} />,
    [EVOLUTIONS]: pokemonEvolutions?.length > 0 && (
      <PokemonDetailsEvolutions pokemonEvolutions={pokemonEvolutions} />
    ),
  };

  useClickOutside(searchModalRef, () => setIsSearchModalOpen(false));

  useEffect(() => {
    const initAllPokemonResources = async () => {
      const { results } = await getAllPokemons(undefined, POKEMON_QUANTITY);

      setAllPokemonResources(results!);
      setIsLoadingResources(false);
    };

    initAllPokemonResources();
  }, []);

  useEffect(() => {
    const initPokemon = async () => {
      setIsSearchModalOpen(false);
    };

    initPokemon();
  }, [id]);

  const getDescription = () => {
    const text = species?.flavorTextEntries?.find(
      ({ language }) => language.name === "en",
    )!.flavorText;

    if (!text) return "";

    return (
      text
        ?.replace(/u'\f'/, " ")
        .replace(/\u00AD/g, "")
        // eslint-disable-next-line no-control-regex
        .replace(/\u000C/g, " ")
        .replace(/u' -\n'/, " - ")
        .replace(/u'-\n'/, "-")
        .replace(/(\r\n|\n|\r)/gm, " ")
    );
  };

  function getPokemonType() {
    return pokemon?.types?.[0].type.name;
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-[1440px]">
        {pokemon && (
          <PokemonDetailHero
            genus={getGenus()}
            pokemon={pokemon}
            pokemonType={getPokemonType()}
            description={getDescription()}
          />
        )}
      </main>
    </>
  );
};

export default DetailsPage;
