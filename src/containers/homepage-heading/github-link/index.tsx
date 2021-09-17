import React from 'react';
import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import styles from './github-link.module.scss';

interface Props {
  imageSrc: string;
  className?: string;
  href?: string;
  rel?: string;
  target?: string;
  ariaLabel?: string;
}

const HomepageHeadingGithubLink = (props: Props) => {
  return (
    <a
      className={classNames(styles['github-link'], props.className)}
      rel={props.rel}
      href={props.href}
      target={props.target}
      aria-label={props.ariaLabel}
    >
      <ReactSVG src={props.imageSrc} />
    </a>
  );
};

export default HomepageHeadingGithubLink;
