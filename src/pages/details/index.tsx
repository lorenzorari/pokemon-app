import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { POKEMON_QUANTITY } from "src/constants";
import PokemonDetailsBiography from "src/containers/pokemon/details/biography";
import PokemonDetailsEvolutions from "src/containers/pokemon/details/evolutions";
import PokemonDetailsStats from "src/containers/pokemon/details/stats";
import { useClickOutside } from "src/hooks/click-outside";
import { NamedAPIResources } from "src/models/named-api-resource";
import { getAllPokemons } from "src/services/pokemon";
import styles from "./details.module.scss";
import { usePokemon } from "src/hooks/pokemon/usePokemon";
import { usePokemonSpecies } from "src/hooks/pokemon/usePokemonSpecies";
import { usePokemonEvolutions } from "src/hooks/pokemon/usePokemonEvolutions";
import { ReactSVG } from "react-svg";
import PokemonDetailHero from "src/components/pages/pokemon-details/Hero";

interface Params {
  id: string;
}

const BIOGRAPHY = "Biography";
const STATS = "Stats";
const EVOLUTIONS = "Evolutions";

const DetailsPage = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { pokemon, isPokemonLoading } = usePokemon(id);
  const { pokemonSpecies: species } = usePokemonSpecies(id);
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
      <header className="sticky top-0 border-b border-b-[#ffffff4d] px-32 py-6 backdrop-blur-lg">
        <nav>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-3xl font-bold"
          >
            <ReactSVG
              wrapper="div"
              width={10}
              className="h-10 w-10"
              src="/assets/svg/logo.svg"
            />
            Pocketex
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        {pokemon && (
          <PokemonDetailHero
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
