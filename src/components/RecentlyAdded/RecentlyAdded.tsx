import {
  collection,
  CollectionReference,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import Listing from '../Listing/Listing';
import styles from './RecentlyAdded.module.scss';

const RecentlyAdded = () => {
  const [recentListings, setRecentListings] = useState<
    QueryDocumentSnapshot<Listing>[]
  >([]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      const recentListingsQuery = query(
        collection(db, 'listings') as CollectionReference<Listing>,
        orderBy('date', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(recentListingsQuery);
      setRecentListings(querySnapshot.docs);
    };
    fetchRecentListings();
  }, []);

  return (
    <div className={styles['recently-added']}>
      <h3>Recently Added</h3>
      <div className={styles.listings}>
        {recentListings.map((listing) => (
          <Listing data={listing.data()} id={listing.id} key={listing.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
