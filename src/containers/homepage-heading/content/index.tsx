import Autocomplete from 'src/containers/autocomplete';
import HomepageHeadingContentHeading from 'src/containers/homepage-heading/content/heading';
import { NamedAPIResources } from 'src/models/named-api-resource';
import styles from './content.module.scss';

interface Props {
  heading: string;
  dataToFilter?: NamedAPIResources;
}

const HomepageHeadingContent = ({ heading, dataToFilter }: Props) => {
  return (
    <div className={styles['content']}>
      <HomepageHeadingContentHeading value={heading} />

      <Autocomplete dataToFilter={dataToFilter} placeholder="Search a pokemon by name or id..." />
    </div>
  );
};

export default HomepageHeadingContent;
