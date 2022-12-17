import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditListingForm, {
  Images,
} from '../../components/NewListing/EditListingForm/EditListingForm';
import NewListingForm from '../../components/NewListing/NewListingForm/NewListingForm';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import { db, storage } from '../../firebase/firebase';

const NewListingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const editId = router.query.edit;
    if (editId && typeof editId === 'string') setEditId(editId);
  }, []);

  const uploadImagesToStorage = async (images: File[], docId: string) => {
    let imageUrls: string[] = [];

    for (const image of images) {
      if (image.name.includes('firebasestorage') && !image.type) return; // Prevent the addition of already uploaded images
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

  const updateHandler = async (newListingData: Listing, images: Images) => {
    setIsLoading(true);
    const docId = newListingData.storageRef;

    const imagesToRemove = images.old!.filter((oldImage) =>
      images.new.every((newImage) => newImage.name !== oldImage)
    );

    imagesToRemove.forEach((imageToRemove) => {
      const toRemoveRef = ref(storage, imageToRemove);
      deleteObject(toRemoveRef);
    });

    const imageUrls = await uploadImagesToStorage(images.new, docId);
    await setDoc(doc(db, 'listings', docId), { ...newListingData, imageUrls });

    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <Wrapper>
      {!editId && (
        <NewListingForm onPublish={publishHandler} isLoading={isLoading} />
      )}
      {editId && (
        <EditListingForm
          onUpdate={updateHandler}
          isLoading={isLoading}
          editId={editId}
        />
      )}
    </Wrapper>
  );
};

export default NewListingPage;
