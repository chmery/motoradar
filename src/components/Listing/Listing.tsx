import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import styles from './Listing.module.scss';
import { IconContext } from 'react-icons';
import { useRouter } from 'next/router';
import { getNumberWithSpaces } from '../../utils/getNumberWithSpaces';

type Props = {
  data: Listing;
  id: string;
};

const Listing = ({ data, id }: Props) => {
  const router = useRouter();
  const url = router.pathname;

  return (
    <div
      onClick={() => router.push(`/listing/${id}`)}
      className={`${styles.listing} ${
        url === '/' ? styles['landing-listing'] : ''
      }`}
    >
      <div className={styles['image-container']}>
        <Image
          src={data.imageUrls[0]}
          alt={data.brand}
          fill
          sizes='200px'
          priority
          className={styles.image}
        />
      </div>
      <div className={styles.container}>
        <div className={styles['time-container']}>
          <p className={styles.time}>
            Listed {new Date(data.date).toLocaleString()}
          </p>
        </div>
        <div>
          <div className={styles['location-container']}>
            <IoLocationOutline />
            <p className={styles.location}>{data.location}</p>
          </div>
          <p className={styles.car}>
            {data.brand} {data.model}
          </p>
          <p className={styles.mileage}>
            {data.productionYear} - {data.mileage} km
          </p>
        </div>
        <div className={styles['price-container']}>
          {data.isAccidentFree && (
            <div className={styles.accident}>
              <IconContext.Provider value={{ className: styles.checkmark }}>
                <FaCheck />
              </IconContext.Provider>
              Accident-Free
            </div>
          )}
          <p className={styles.price}>${getNumberWithSpaces(data.price)}</p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
