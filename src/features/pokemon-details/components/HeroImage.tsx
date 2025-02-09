import { PokemonType } from 'src/models/types';

type Props = {
  pokemonType: PokemonType;
  imageSrc: string;
  imageAlt?: string;
};

const PokemonDetailHeroImage = ({ pokemonType, imageSrc, imageAlt }: Props) => {
  const backgroundColor = `var(--color-${pokemonType}-1)`;

  return (
    <div className="relative flex items-center justify-center">
      <div
        style={{ backgroundColor }}
        className="absolute z-[-1] size-[372px] rounded-full opacity-[6%] md:size-[48vw] xl:max-h-[800px] xl:max-w-[800px]"
      ></div>
      <div
        style={{ backgroundColor }}
        className="absolute z-[-1] size-[278px] rounded-full opacity-[12%] md:size-[36vw] xl:max-h-[600px] xl:max-w-[600px]"
      ></div>
      <div
        style={{ backgroundColor }}
        className="xl:max-w absolute z-[-1] size-[186px] rounded-full opacity-[18%] md:size-[24vw] xl:max-h-[400px] xl:max-w-[400px]"
      ></div>
      <div
        className="absolute z-[-1] size-[186px] animate-spin rounded-full [animation-duration:10s] md:size-[24vw] xl:max-h-[400px] xl:max-w-[400px]"
        style={{
          backgroundImage: `conic-gradient(from 0deg at 100% 10%,#FFFFFFFF 0%,#FFFFFFFF 50%,${backgroundColor} 100%)`,
        }}
      ></div>
      <figure className="size-[298px] lg:size-auto">
        <img
          className="levitate animate-levitate"
          src={imageSrc}
          alt={imageAlt}
        />
      </figure>
    </div>
  );
};

export default PokemonDetailHeroImage;
