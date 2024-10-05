import React, { useState } from "react";
import Particles from "react-tsparticles";
import Autocomplete from "src/containers/autocomplete";
import tsparticlesOptions from "src/data/tsparticlesOptions";

interface Props {
  heading: string;
}

const HeroBanner = (props: Props) => {
  const [areParticlesLoading, setAreParticlesLoading] = useState<boolean>(true);

  const initParticles = (tsParticles: any) => {
    tsParticles
      .load("tsparticles", tsparticlesOptions)
      .then(() => setAreParticlesLoading(false));
  };

  return (
    <section
      // className={
      //   props.areParticlesLoading
      //     ? styles.hidden
      //     : styles["homepage-heading-container"]
      // }
      className="relative h-screen bg-primary"
    >
      <Particles
        className="absolute inset-0"
        // className={styles.particles}
        init={initParticles as any}
        options={tsparticlesOptions}
      />

      <div className="relative z-[1] flex h-full items-center justify-center">
        <div>
          <h1 className="text-[10rem] font-semibold leading-snug text-white">
            {props.heading}
          </h1>
          <Autocomplete placeholder="Search a pokemon by name or number..." />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
