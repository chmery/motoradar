import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../../../hooks/useUser';
import { getNumberWithSpaces } from '../../../utils/getNumberWithSpaces';
import styles from './Seller.module.scss';

type Props = {
  uid: string;
};

const Seller = ({ uid }: Props) => {
  const user = useUser(uid);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <section className={styles.seller}>
      <h3>Seller Info</h3>
      <div className={styles.container}>
        {user && (
          <Image
            src={user.photoURL as string}
            alt={user.displayName as string}
            width={80}
            height={80}
            className={styles.image}
          />
        )}
        <div className={styles.info}>
          <h3>{user.displayName}</h3>
          <p className={styles.text}>
            {getNumberWithSpaces(user.phoneNumber as string)}
          </p>
          <p className={styles.text}>{user.location}</p>
        </div>
      </div>
      <Link href={`/profile/${uid}`} className={styles.link}>
        Visit Profile
      </Link>
    </section>
  );
};

export default Seller;
