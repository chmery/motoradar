import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { AuthType, useAuth } from '../../../store/AuthContext';
import Listing from './Listing';

const Listings = () => {
  const { user } = useAuth() as AuthType;
  const [listings, setListings] = useState<
    QueryDocumentSnapshot<Listing>[] | undefined
  >(undefined);

  useEffect(() => {
    const getListings = async () => {
      if (user) {
        const listingsQuery = query(
          collection(db, 'listings') as CollectionReference<Listing>,
          where('uid', '==', user?.uid),
          orderBy('date', 'desc')
        );

        const listingsDocs = await getDocs(listingsQuery);

        setListings(listingsDocs.docs);
      }
    };

    getListings();
  }, [user]);

  return (
    <section>
      {listings?.map((data) => (
        <Listing key={data.id} data={data.data()} id={data.id} />
      ))}
    </section>
  );
};

export default Listings;
