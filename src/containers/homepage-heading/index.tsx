import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import Particles, { Main } from 'react-tsparticles';
import particlesOptions from 'src/data/tsparticlesOptions';
import ScrollIcon from 'src/containers/homepage-heading/scroll-icon';
import styles from './homepage-heading.module.scss';
import HomepageHeadingContent from './content';
import HomepageHeadingGithubLink from './github-link';

interface Props {
  heading: string;
  scrollToRef?: React.MutableRefObject<any>;
  areParticlesLoading?: boolean;
  initParticles?: (tsParticles: Main) => void;
}

const HomepageHeadingContainer = ({
  heading,
  scrollToRef,
  areParticlesLoading,
  initParticles,
}: Props) => {
  const scrollTo = () => {
    scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={
        areParticlesLoading === true
          ? styles.hidden
          : styles['homepage-heading-container']
      }
    >
      <Particles
        className={styles.particles}
        init={initParticles}
        options={particlesOptions}
      />

      <HomepageHeadingContent heading={heading} />

      <HomepageHeadingGithubLink
        imageSrc="/assets/svg/github.svg"
        className={styles['github-link']}
        rel="noreferrer"
        href="https://github.com/lorenzorari/pocketex"
        target="_blank"
        aria-label="Github link"
      />

      <ScrollIcon
        className={styles['scroll-icon']}
        onClick={scrollTo}
        src="/assets/svg/arrow.svg"
      />
    </section>
  );
};

export default HomepageHeadingContainer;
