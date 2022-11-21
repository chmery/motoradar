import UserInfo from 'components/Dashboard/UserInfo/UserInfo';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import styles from './index.module.scss';

const DashboardPage = () => {
  return (
    <Wrapper>
      <div className={styles.main}>
        <section className={styles.options}>
          <UserInfo />
        </section>
        <section className={styles.listings}>listings</section>
      </div>
    </Wrapper>
  );
};

export default DashboardPage;
