import React, { useState } from 'react';
import Particles, { Main } from 'react-tsparticles';
import particlesOptions from 'src/data/tsparticlesOptions';
import ScrollIcon from 'src/containers/homepage-heading/scroll-icon';
import HomepageHeadingContent from 'src/containers/homepage-heading/content';
import HomepageHeadingGithubLink from 'src/containers/homepage-heading/github-link';
import styles from './homepage-heading.module.scss';

interface Props {
  heading: string;
  githubHref: string;
  githubImageSrc: string;
  scrollToRef?: React.MutableRefObject<any>;
  areParticlesLoading?: boolean;
  initParticles?: (tsParticles: Main) => void;
}

const HomepageHeadingContainer = (props: Props) => {
  const scrollTo = () => {
    props.scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className={
        props.areParticlesLoading === true
          ? styles.hidden
          : styles['homepage-heading-container']
      }
    >
      <Particles
        className={styles.particles}
        init={props.initParticles}
        options={particlesOptions}
      />

      <HomepageHeadingContent heading={props.heading} />

      <HomepageHeadingGithubLink
        className={styles['github-link']}
        href={props.githubHref}
        imageSrc={props.githubImageSrc}
        rel="noreferrer"
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
