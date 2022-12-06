import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Page from '../../../components/ListingPage/Page';
import Wrapper from '../../../components/UI/Wrapper/Wrapper';
import { db } from '../../../firebase/firebase';

const ListingPage = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      {isLoading && <div>Loading ...</div>}
      {!isLoading && listing && (
        <Page data={listing} listingId={listingId as string} />
      )}
    </Wrapper>
  );
};

export default ListingPage;
