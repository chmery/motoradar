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
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import { db } from '../../firebase/firebase';
import { useUser } from '../../hooks/useUser';
import { AuthType, useAuth } from '../../store/AuthContext';

import styles from './SavedPage.module.scss';

const SavedPage = () => {
  const [savedListings, setSavedListings] = useState<
    QueryDocumentSnapshot<Listing>[] | null
  >(null);

  const { userData } = useAuth() as AuthType;
  const user = useUser(userData?.uid);

  useEffect(() => {
    const getSavedListings = async () => {
      if (user && user.saved.length > 0) {
        const saved = user.saved;
        const batches: QueryDocumentSnapshot<Listing>[] = [];

        while (saved.length) {
          const batch = saved.splice(0, 10);
          console.log(batch);

          const queryListings = query(
            collection(db, 'listings') as CollectionReference<Listing>,
            where('__name__', 'in', batch)
          );

          const querySnapshot = await getDocs(queryListings);

          querySnapshot.forEach((doc) => batches.push(doc));
        }
        setSavedListings(batches);
      }
    };

    getSavedListings();
  }, [user]);

  return (
    <Wrapper>
      <div className={styles.main}>
        <h2 className={styles.header}>Saved listings</h2>
        {savedListings?.map((listing) => (
          <Listing key={listing.id} data={listing.data()} id={listing.id} />
        ))}
      </div>
    </Wrapper>
  );
};

export default SavedPage;
