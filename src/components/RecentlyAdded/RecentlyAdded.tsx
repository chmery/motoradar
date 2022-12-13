import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase';
import Listing from '../Listing/Listing';
import styles from './RecentlyAdded.module.scss';

type RecentListing = {
  data: Listing;
  id: string;
};

const RecentlyAdded = () => {
  const [recentListings, setRecentListings] = useState<RecentListing[]>([]);

  useEffect(() => {
    const fetchRecentListings = async () => {
      const recentListings: RecentListing[] = [];

      const recentListingsQuery = query(
        collection(db, 'listings'),
        orderBy('date', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(recentListingsQuery);
      querySnapshot.forEach((listing) => {
        const data = listing.data() as Listing;
        const id = listing.id;
        recentListings.push({ data, id });
      });
      setRecentListings(recentListings);
    };
    fetchRecentListings();
  }, []);

  return (
    <div className={styles['recently-added']}>
      <h3>Recently Added</h3>
      <div className={styles.listings}>
        {recentListings.map((listing) => (
          <Listing data={listing.data} id={listing.id} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyAdded;
