import Image from 'next/image';
import Wrapper from '../components/UI/Wrapper/Wrapper';
import styles from './Custom404.module.scss';

const Custom404 = () => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <Image src='/404.png' alt='404 image' width={400} height={400} />
        <h2 className={styles.text}>Page Not Found!</h2>
      </div>
    </Wrapper>
  );
};

export default Custom404;
