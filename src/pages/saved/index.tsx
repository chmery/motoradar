import {
  collection,
  CollectionReference,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Listing from '../../components/Listing/Listing';
import ListingLoader from '../../components/UI/Loaders/ListingLoader/ListingLoader';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import { db } from '../../firebase/firebase';
import { useUser } from '../../hooks/useUser';
import { AuthType, useAuth } from '../../store/AuthContext';

import styles from './SavedPage.module.scss';

const SavedPage = () => {
  const [savedListings, setSavedListings] = useState<
    QueryDocumentSnapshot<Listing>[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const { userData } = useAuth() as AuthType;
  const user = useUser(userData?.uid);

  useEffect(() => {
    const getSavedListings = async () => {
      setIsLoading(true);
      if (user && user.saved.length) {
        const saved = user.saved;
        const batches: QueryDocumentSnapshot<Listing>[] = [];

        while (saved.length) {
          const batch = saved.splice(0, 10);

          const queryListings = query(
            collection(db, 'listings') as CollectionReference<Listing>,
            where('__name__', 'in', batch)
          );

          const querySnapshot = await getDocs(queryListings);

          querySnapshot.forEach((doc) => batches.push(doc));
        }
        setSavedListings(batches);
      }
      setIsLoading(false);
    };

    getSavedListings();
  }, [user]);

  return (
    <Wrapper>
      <div className={styles.main}>
        {savedListings && <h2 className={styles.header}>Saved listings</h2>}
        {isLoading && <ListingLoader />}
        {!isLoading &&
          savedListings?.map((listing) => (
            <Listing key={listing.id} data={listing.data()} id={listing.id} />
          ))}
        {!savedListings && (
          <div className={styles.empty}>No listings saved</div>
        )}
      </div>
    </Wrapper>
  );
};

export default SavedPage;
