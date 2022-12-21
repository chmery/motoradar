import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Page from '../../../components/ListingPage/Page';
import ListingPageLoader from '../../../components/UI/Loaders/ListingPageLoader/ListingPageLoader';
import MobileListingPageLoader from '../../../components/UI/Loaders/ListingPageLoader/MobileListingPageLoader/MobileListingPageLoader';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import { db } from '../../../firebase/firebase';
import useWindowSize from '../../../hooks/useWindowSize';

const ListingPage = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { width } = useWindowSize();

  const router = useRouter();
  const listingId = router.query.id;

  useEffect(() => {
    const getListing = async () => {
      setIsLoading(true);
      if (listingId) {
        const docRef = doc(
          db,
          'listings',
          listingId as string
        ) as DocumentReference<Listing>;
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setListing(docSnap.data());
        } else {
          console.error('Document with provided id not found!');
        }
      }

      setIsLoading(false);
    };

    getListing();
  }, [listingId]);

  return (
    <>
      <Head>
        <title>Motoradar - Listing</title>
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='Car marketplace allowing people to list or search for new or used cars.'
        />
        <meta
          name='keywords'
          content='car marketplace, car, cars, new car, new cars, demaged car, find car, car finder, motoradar'
        />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
      </Head>
      <Wrapper>
        {isLoading && width <= 800 && <MobileListingPageLoader />}
        {isLoading && width > 800 && <ListingPageLoader />}
        {!isLoading && listing && (
          <Page data={listing} listingId={listingId as string} />
        )}
      </Wrapper>
    </>
  );
};

export default ListingPage;
