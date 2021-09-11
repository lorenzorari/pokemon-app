import React from 'react';
import classNames from 'classnames';
import styles from './heading.module.scss';

interface Props {
  title: string;
  className?: string;
}

const HomepageHeading = ({ title, className }: Props) => {
  return (
    <div className={classNames(styles.heading, className)}>
      <h1>{title}</h1>
    </div>
  );
};

export default HomepageHeading;
