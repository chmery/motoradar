import styles from './MobileListingPageLoader.module.scss';

const MobileListingPageLoader = () => {
  return (
    <div className={styles.page}>
      <div className={`${styles.gradient} ${styles['image-container']}`}></div>
      <div className={`${styles.big} ${styles.gradient}`}></div>
      <div className={`${styles.gradient} ${styles.small}`}></div>
      <div className={`${styles.gradient} ${styles['big-medium']}`}></div>
      <div className={`${styles.gradient} ${styles.header}`}></div>
      <div className={styles['details-container']}>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
        <div className={`${styles.gradient} ${styles.detail}`}></div>
      </div>
      <div className={`${styles.gradient} ${styles.header}`}></div>
      <div className={`${styles.gradient} ${styles.description}`}></div>
      <div
        className={`${styles.gradient} ${styles['description__medium']}`}
      ></div>
      <div className={`${styles.gradient} ${styles.description}`}></div>
      <div
        className={`${styles.gradient} ${styles['description__medium']}`}
      ></div>
      <div
        className={`${styles.gradient} ${styles['description__small']}`}
      ></div>
      <div className={`${styles.gradient} ${styles['header-seller']}`}></div>
      <div className={styles.container}>
        <div className={`${styles.circle} ${styles.gradient}`}></div>
        <div className={styles['info-container']}>
          <div className={`${styles.gradient} ${styles.name}`}></div>
          <div className={`${styles.gradient} ${styles.small}`}></div>
          <div
            className={`${styles.gradient} ${styles.small}`}
            style={{ margin: 0 }}
          ></div>
        </div>
      </div>
      <div className={`${styles.gradient} ${styles.time}`}></div>
    </div>
  );
};

export default MobileListingPageLoader;
