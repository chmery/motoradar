import { useUser } from '../../hooks/useUser';
import { getNumberWithSpaces } from '../../utils/getNumberWithSpaces';
import styles from './Page.module.scss';
import Seller from './Seller/Seller';

type Props = {
  data: Listing;
};

const Page = ({ data }: Props) => {
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
      <section className={styles.listing}></section>
    </article>
  );
};

export default Page;
