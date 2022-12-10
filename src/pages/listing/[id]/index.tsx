import { doc, DocumentReference, getDoc } from 'firebase/firestore';
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
    <Wrapper>
      {isLoading && width <= 800 && <MobileListingPageLoader />}
      {isLoading && width > 800 && <ListingPageLoader />}
      {!isLoading && listing && (
        <Page data={listing} listingId={listingId as string} />
      )}
    </Wrapper>
  );
};

export default ListingPage;
