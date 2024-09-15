import { useEffect, useRef, useState } from "react";
import { POKEMON_QUANTITY } from "src/constants";
import HomepageHeadingContainer from "src/containers/homepage-heading";
import tsparticlesOptions from "src/data/tsparticlesOptions";
import { HomeLayout } from "src/layouts/HomeLayout";
import { NamedAPIResources } from "src/models/named-api-resource";
import { Pokemons } from "src/models/pokemon";
import { getGeneration } from "src/services/generation";
import { getAllPokemons, getPokemon } from "src/services/pokemon";

const POKEMON_FETCH_LIMIT = 20;

const HomePage = () => {
  const [displayedPokemons, setDisplayedPokemons] = useState<Pokemons>([]);
  const [allPokemonResources, setAllPokemonResources] =
    useState<NamedAPIResources>([]);
  const [filteredPokemonResources, setFilteredPokemonResources] =
    useState<NamedAPIResources>([]);

  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(true);
  const [areParticlesLoading, setAreParticlesLoading] = useState<boolean>(true);
  const isPageLoading: boolean = isLoadingPokemon || areParticlesLoading;

  const cardsRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const { results: pokeRes } = await getAllPokemons(
        undefined,
        POKEMON_QUANTITY,
      );
      const { results: generationRes } = await getGeneration();

      if (!pokeRes || !generationRes) return;

      const slicedPokemonResources = pokeRes.slice(0, POKEMON_FETCH_LIMIT);
      const pokemonData = await loadPokemons(slicedPokemonResources);

      setDisplayedPokemons([...displayedPokemons, ...pokemonData]);
      setAllPokemonResources(pokeRes);
      setFilteredPokemonResources(pokeRes);
      setIsLoadingPokemon(false);
    };

    init();
  }, []);

  useEffect(() => {
    const updateDisplayedPokemons = async () => {
      const slicedFilteredPokemonResources = filteredPokemonResources.slice(
        0,
        POKEMON_FETCH_LIMIT,
      );
      const pokemonData = await loadPokemons(slicedFilteredPokemonResources);

      setDisplayedPokemons(pokemonData);
    };

    updateDisplayedPokemons();
  }, [filteredPokemonResources]);

  const loadPokemons = async (data: NamedAPIResources) => {
    const pokemonData = await Promise.all(
      data.map(async ({ name }) => await getPokemon(name!)),
    );

    return pokemonData;
  };

  const initParticles = (tsParticles: any) => {
    tsParticles
      .load("tsparticles", tsparticlesOptions)
      .then(() => setAreParticlesLoading(false));
  };

  return (
    <HomeLayout>
      <HomepageHeadingContainer
        heading="Pocketex"
        githubHref="https://github.com/lorenzorari/pocketex"
        githubImageSrc="/assets/svg/github.svg"
        scrollToRef={cardsRef}
        initParticles={initParticles}
        areParticlesLoading={isPageLoading}
        dataToFilter={allPokemonResources}
      />
    </HomeLayout>
  );
};

export default HomePage;
