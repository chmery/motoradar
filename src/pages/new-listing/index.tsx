import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useState } from 'react';
import NewListingForm from '../../components/NewListing/NewListingForm/NewListingForm';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import { db, storage } from '../../firebase/firebase';

const NewListingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const uploadImagesToStorage = async (images: File[], docId: string) => {
    let imageUrls: string[] = [];

    for (const image of images) {
      const imageRef = ref(
        storage,
        `${docId}/${image.name}${Math.round(Math.random() * 1000)}`
      );

      await uploadBytes(imageRef, image);
    }

    const imageItems = await listAll(ref(storage, docId));

    for (const imageItem of imageItems.items) {
      const imageUrl = await getDownloadURL(imageItem);
      imageUrls.push(imageUrl);
    }

    return imageUrls;
  };

  const publishHandler = async (listingData: Listing, images: File[]) => {
    setIsLoading(true);
    const docRef = await addDoc(collection(db, 'listings'), listingData);
    const imageUrls = await uploadImagesToStorage(images, docRef.id);

    const updatedListingData = {
      ...listingData,
      storageRef: docRef.id,
      imageUrls,
    };

    await setDoc(doc(db, 'listings', docRef.id), updatedListingData);
    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <Wrapper>
      <NewListingForm onPublish={publishHandler} isLoading={isLoading} />
    </Wrapper>
  );
};

export default NewListingPage;
