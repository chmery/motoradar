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
import ListingLoader from '../../UI/Loaders/ListingLoader/ListingLoader';
import Listing from './Listing/Listing';

type Props = {
  uid: string | string[] | undefined;
};

const Listings = ({ uid }: Props) => {
  const [listings, setListings] = useState<
    QueryDocumentSnapshot<Listing>[] | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      setIsLoading(true);
      if (uid) {
        const listingsQuery = query(
          collection(db, 'listings') as CollectionReference<Listing>,
          where('uid', '==', uid),
          orderBy('date', 'desc')
        );

        const listingsDocs = await getDocs(listingsQuery);

        setListings(listingsDocs.docs);
        setIsLoading(false);
      }
    };

    getListings();
  }, [uid]);

  return (
    <section>
      {isLoading && <ListingLoader />}
      {listings?.map((data) => (
        <Listing key={data.id} data={data.data()} id={data.id} />
      ))}
    </section>
  );
};

export default Listings;
