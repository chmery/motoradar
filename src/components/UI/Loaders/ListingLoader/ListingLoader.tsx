import styles from './ListingLoader.module.scss';

const ListingLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={`${styles.image} ${styles.gradient}`}></div>
      <div className={styles.container}>
        <div className={`${styles.gradient} ${styles.slim}`}></div>
        <div>
          <div className={`${styles.gradient} ${styles.slim}`}></div>
          <div className={`${styles.gradient} ${styles.car}`}></div>
          <div className={`${styles.gradient} ${styles.slim}`}></div>
        </div>
        <div className={`${styles.gradient} ${styles.price}`}></div>
      </div>
    </div>
  );
};

export default ListingLoader;
