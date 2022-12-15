import Filter from '../components/Filter/Filter';
import RecentlyAdded from '../components/RecentlyAdded/RecentlyAdded';
import Wrapper from '../components/UI/Wrapper/Wrapper';
import styles from './index.module.scss';

export default function Home() {
  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <Wrapper>
          <div className={styles.filter}>
            <Filter />
          </div>
          <RecentlyAdded />
        </Wrapper>
      </div>
    </div>
  );
}
