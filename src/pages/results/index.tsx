import styles from './ResultsPage.module.scss';
import { useRouter } from 'next/router';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Filter from '../../components/Filter/Filter';

const ResultsPage = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.filters}>
          <Filter />
        </div>
        <div className={styles.listings}>aha</div>
      </div>
    </Wrapper>
  );
};

export default ResultsPage;
