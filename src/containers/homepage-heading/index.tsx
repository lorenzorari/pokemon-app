import React, { memo } from "react";
import Particles from "react-tsparticles";
import particlesOptions from "src/data/tsparticlesOptions";
import HomepageHeadingContent from "src/containers/homepage-heading/content";
import styles from "./homepage-heading.module.scss";
import { NamedAPIResources } from "src/models/named-api-resource";

interface Props {
  heading: string;
  githubHref: string;
  githubImageSrc: string;
  dataToFilter?: NamedAPIResources;
  scrollToRef?: React.MutableRefObject<any>;
  areParticlesLoading?: boolean;
  initParticles?: (tsParticles: any) => void;
}

const HomepageHeadingContainer = (props: Props) => {
  const scrollTo = () => {
    props.scrollToRef?.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={
        props.areParticlesLoading === true
          ? styles.hidden
          : styles["homepage-heading-container"]
      }
    >
      <Particles
        className={styles.particles}
        init={props.initParticles as any}
        options={particlesOptions}
      />

      <HomepageHeadingContent
        heading={props.heading}
        dataToFilter={props.dataToFilter}
      />
    </section>
  );
};

const arePropsEqual = (prev: Readonly<Props>, next: Readonly<Props>) => {
  return (
    prev.areParticlesLoading === next.areParticlesLoading &&
    prev.dataToFilter === next.dataToFilter &&
    prev.githubHref === next.githubHref &&
    prev.githubImageSrc === next.githubImageSrc &&
    prev.heading === next.heading &&
    prev.scrollToRef === next.scrollToRef
  );
};

export default memo(HomepageHeadingContainer, arePropsEqual);
