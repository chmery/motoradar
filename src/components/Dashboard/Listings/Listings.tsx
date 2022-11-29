import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { AuthType, useAuth, UserType } from '../../../store/AuthContext';
import Listing from './Listing';
import styles from './Listings.module.scss';

const Listings = () => {
  const { user } = useAuth() as AuthType;
  const [listings, setListings] = useState<Listing[] | undefined>(undefined);

  useEffect(() => {
    const getListings = async () => {
      if (user) {
        const listingsQuery = query(
          collection(db, 'listings') as CollectionReference<Listing>,
          where('uid', '==', user?.uid),
          orderBy('date', 'desc')
        );

        const listingsDocs = await getDocs(listingsQuery);
        const listings: Listing[] = [];

        listingsDocs.forEach((doc) => {
          listings.push(doc.data());
        });

        setListings(listings);
      }
    };

    getListings();
  }, [user]);

  return (
    <section>
      {listings?.map((data, index) => (
        <Listing key={index} data={data} />
      ))}
    </section>
  );
};

export default Listings;
