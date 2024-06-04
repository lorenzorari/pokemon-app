import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './error.module.scss';

interface Props {
  error: string;
  className?: string;
  src?: string;
}

const AutocompleteError = ({ error, className, src }: Props) => {
  return (
    <>
      {error && (
        <div className={classNames(styles.error, className)}>
          {error}
          <span>
            <ReactSVG className={styles.icon} src={src!} />
          </span>
        </div>
      )}
    </>
  );
};

export default AutocompleteError;
