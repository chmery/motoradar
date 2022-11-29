import NewListingForm from 'components/NewListing/NewListingForm/NewListingForm';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../firebase/firebase';

const NewListingPage = () => {
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
    const docRef = await addDoc(collection(db, 'listings'), listingData);
    const imageUrls = await uploadImagesToStorage(images, docRef.id);

    const updatedListingData = {
      ...listingData,
      storageRef: docRef.id,
      imageUrls,
    };

    await setDoc(doc(db, 'listings', docRef.id), updatedListingData);
  };

  return (
    <Wrapper>
      <NewListingForm onPublish={publishHandler} />
    </Wrapper>
  );
};

export default NewListingPage;
