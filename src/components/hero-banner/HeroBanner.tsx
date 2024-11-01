import React, { useState } from 'react';
import Particles from 'react-tsparticles';
import Autocomplete from 'src/components/autocomplete';
import tsparticlesOptions from 'src/data/tsparticlesOptions';

interface Props {
  heading: string;
}

const HeroBanner = (props: Props) => {
  const [areParticlesLoading, setAreParticlesLoading] = useState<boolean>(true);

  const initParticles = (tsParticles: any) => {
    tsParticles
      .load('tsparticles', tsparticlesOptions)
      .then(() => setAreParticlesLoading(false));
  };

  return (
    <section className="relative h-screen bg-primary">
      <Particles
        className="absolute inset-0 scale-0 animate-scaleUp [animation-delay:2s]"
        init={initParticles as any}
        options={tsparticlesOptions}
      />

      <div className="flex h-full items-center justify-center">
        <div className="relative z-[1]">
          <div className="overflow-hidden">
            <h1 className="-translate-y-full animate-slideFromTop text-[10rem] font-semibold leading-snug text-white [animation-delay:0.5s]">
              {props.heading}
            </h1>
          </div>
          <Autocomplete placeholder="Search a pokemon by name or number..." />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
