import { memo } from "react";
import styles from "./heading.module.scss";
import { cn } from "src/utils/classnames";

interface Props {
  value: string;
  className?: string;
}

const HomepageHeadingContentHeading = ({ value, className }: Props) => {
  return (
    <div className={cn(styles.heading, className)}>
      <h1>{value}</h1>
    </div>
  );
};

const arePropsEqual = (prev: Readonly<Props>, next: Readonly<Props>) =>
  prev.value === next.value;

export default memo(HomepageHeadingContentHeading, arePropsEqual);
