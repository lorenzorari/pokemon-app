import { PokemonType } from "src/components/PokemonTypeBadge/PokemonTypeBadge";

type Props = {
  pokemonType: PokemonType;
  imageSrc: string;
  imageAlt?: string;
};

const PokemonDetailHeroImage = ({ pokemonType, imageSrc, imageAlt }: Props) => {
  const backgroundColor = `var(--color-${pokemonType}-1)`;

  return (
    <>
      <div
        style={{ backgroundColor }}
        className="absolute size-[800px] rounded-full opacity-[6%]"
      ></div>
      <div
        style={{ backgroundColor }}
        className="absolute size-[600px] rounded-full opacity-[12%]"
      ></div>
      <div
        style={{ backgroundColor }}
        className="absolute size-[400px] rounded-full opacity-[18%]"
      ></div>
      <div
        className="absolute size-[400px] animate-spin rounded-full border [animation-duration:10s]"
        style={{
          backgroundImage: `conic-gradient(from 0deg at 100% 10%,#FFFFFFFF 0%,#FFFFFFFF 50%,${backgroundColor} 100%)`,
        }}
      ></div>
      <img className="z-10" src={imageSrc} alt={imageAlt} />
    </>
  );
};

export default PokemonDetailHeroImage;
