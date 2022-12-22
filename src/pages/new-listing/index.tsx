import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NewListingForm, {
  EditImages,
} from '../../components/NewListing/NewListingForm/NewListingForm';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import { db, storage } from '../../firebase/firebase';
import { uploadImagesToStorage } from '../../utils/uploadImagesToStorage';

const NewListingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState('');

  const router = useRouter();

  useEffect(() => {
    const editId = router.query.edit;
    if (editId && typeof editId === 'string') setEditId(editId);
  }, [router.query.edit]);

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

  const editHandler = async (newListingData: Listing, images: EditImages) => {
    setIsLoading(true);
    const docId = newListingData.storageRef;

    const imagesToRemove = images.old!.filter((oldImage) =>
      images.new.every((newImage) => newImage.name !== oldImage)
    );

    imagesToRemove.forEach((imageToRemove) => {
      const toRemoveRef = ref(storage, imageToRemove);
      deleteObject(toRemoveRef);
    });

    const imageUrls = await uploadImagesToStorage(images.new, docId!);
    await setDoc(doc(db, 'listings', docId!), {
      ...newListingData,
      imageUrls: imageUrls ? imageUrls : newListingData.imageUrls,
    });

    router.push('/dashboard');
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Motoradar - {editId ? 'Edit listing' : 'Add listing'}</title>
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
      <NewListingForm
        onPublish={publishHandler}
        onEdit={editHandler}
        isLoading={isLoading}
        editId={editId}
      />
    </Wrapper>
    </>
  );
};

export default NewListingPage;
