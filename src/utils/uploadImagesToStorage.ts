import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export const uploadImagesToStorage = async (images: File[], docId: string) => {
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
