import React, { memo } from 'react';
import classNames from 'classnames';
import styles from './heading.module.scss';

interface Props {
  value: string;
  className?: string;
}

const HomepageHeadingContentHeading = ({ value, className }: Props) => {
  return (
    <div className={classNames(styles.heading, className)}>
      <h1>{value}</h1>
    </div>
  );
};

const arePropsEqual = (prev: Readonly<Props>, next: Readonly<Props>) =>
  prev.value === next.value;

export default memo(HomepageHeadingContentHeading, arePropsEqual);
