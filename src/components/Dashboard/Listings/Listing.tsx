import Image from 'next/image';
import Link from 'next/link';
import { BiEditAlt } from 'react-icons/bi';
import { IoLocationOutline } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import styles from './Listing.module.scss';
import { IconContext } from 'react-icons';

type Props = {
  data: Listing;
};

const Listing = ({ data }: Props) => {
  return (
    <Link href={`/listing/refdodocatumabyc`} className={styles.listing}>
      <Image
        src={data.imageUrls[0]}
        alt={data.brand}
        width={150}
        height={150}
        className={styles.image}
      />
      <div className={styles.container}>
        <div className={styles['time-container']}>
          <p className={styles.time}>
            Listed {new Date(data.date).toLocaleString()}
          </p>
          <Link href={`/new-listing?${123}`} className={styles.edit}>
            <BiEditAlt />
          </Link>
        </div>
        <div className={styles['location-container']}>
          <IoLocationOutline />
          <p className={styles.location}>Tu ma być lokalizacja</p>
        </div>
        <p className={styles.car}>
          {data.brand} {data.model}
        </p>
        <p className={styles.mileage}>
          {data.productionYear} - {data.mileage} km
        </p>
        <div className={styles['price-container']}>
          {data.isAccidentFree && (
            <div className={styles.accident}>
              <IconContext.Provider value={{ className: styles.checkmark }}>
                <FaCheck />
              </IconContext.Provider>
              Accident-Free
            </div>
          )}
          <p className={styles.price}>${data.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default Listing;
