import classNames from 'classnames';
import { ReactSVG } from 'react-svg';
import styles from './loading.module.scss';

interface Props {
  src: string;
  className?: string;
  text?: string;
}

const Loading = ({ src, className, text }: Props) => {
  return (
    <div className={styles.loading}>
      <ReactSVG className={classNames(styles['loading-icon'], className)} src={src} />
      {text && <span className={styles.text}>{text}</span>}
    </div>
  );
};

export default Loading;
