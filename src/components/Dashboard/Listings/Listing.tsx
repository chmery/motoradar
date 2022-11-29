import Image from 'next/image';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { BiEditAlt } from 'react-icons/bi';
import styles from './Listing.module.scss';

type Props = {
  data: Listing;
};

const Listing = ({ data }: Props) => {
  return (
    <div className={styles.listing}>
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
      </div>
    </div>
  );
};

export default Listing;
