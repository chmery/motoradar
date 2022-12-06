import { getNumberWithSpaces } from '../../utils/getNumberWithSpaces';
import Carousel from './Carousel/Carousel';
import styles from './Page.module.scss';
import Seller from './Seller/Seller';

type Props = {
  data: Listing;
  listingId: string;
};

const Page = ({ data, listingId }: Props) => {
  return (
    <article className={styles.page}>
      <section className={styles.info}>
        <h2 className={styles.car}>
          {data.brand} {data.model}
        </h2>
        <div className={styles.date}>
          {data.productionYear}
          <div className={styles.circle}></div>
          {getNumberWithSpaces(data.mileage)}km
        </div>
        <p className={styles.price}>${getNumberWithSpaces(data.price)}</p>
        <Seller uid={data.uid} />
      </section>
      <section className={styles.listing}>
        <Carousel images={data.imageUrls} listingId={listingId} />
        <h4 className={styles.header}>Details</h4>
        <div className={styles.details}>
          <p className={styles['details__type']}>Brand</p>
          <p>{data.brand}</p>
          <p className={styles['details__type']}>Model</p>
          <p>{data.model}</p>
          <p className={styles['details__type']}>Production Year</p>
          <p>{data.productionYear}</p>
          <p className={styles['details__type']}>Mileage</p>
          <p>{getNumberWithSpaces(data.mileage)}km</p>
          <p className={styles['details__type']}>Power</p>
          <p>{data.power}HP</p>
          <p className={styles['details__type']}>Fuel Type</p>
          <p>{data.fuelType}</p>
          <p className={styles['details__type']}>Gearbox</p>
          <p>{data.gearbox}</p>
          <p className={styles['details__type']}>Powertrain</p>
          <p>{data.powertrain}</p>
        </div>
        <h4 className={styles.header}>Description</h4>
        <p className={styles.description}>{data.description}</p>
        <p className={styles.date}>
          Listed {new Date(data.date).toLocaleString()}
        </p>
      </section>
    </article>
  );
};

export default Page;
