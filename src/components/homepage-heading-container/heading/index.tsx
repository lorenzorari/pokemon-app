import React, { memo } from 'react';
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

const arePropsEqual = (prev: Readonly<Props>, next: Readonly<Props>) =>
  prev.title === next.title;

export default memo(HomepageHeading, arePropsEqual);
