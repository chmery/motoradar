import { ChangeEvent, useRef, useState, MouseEvent, useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import styles from './ImageLoader.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../../UI/Button/Button';
import Image from 'next/image';

type Props = {
  onImageUpload: (images: File[] | []) => void;
  imagesFromStorage?: string[];
};

const ImageLoader = ({ onImageUpload, imagesFromStorage }: Props) => {
  const [uploadedImages, setUploadedImages] = useState<File[] | []>([]);
  const [imagesUrls, setImagesUrls] = useState<{ url: string; name: string }[]>(
    []
  );

  const areImagesUploaded = uploadedImages.length > 0 ? true : false;

  useEffect(() => {
    if (!imagesFromStorage) return;

    const filesInStorage = imagesFromStorage.map((url) => new File([url], url));
    const urlsInStorage = imagesFromStorage.map((url) => {
      return { url, name: url };
    });

    setUploadedImages(filesInStorage);
    setImagesUrls(urlsInStorage);
  }, [imagesFromStorage]);

  useEffect(() => {
    onImageUpload(uploadedImages);
  }, [uploadedImages]);

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 12;

  const startUploadingHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!uploadInputRef.current) return;
    uploadInputRef.current.click();
  };

  const getImagesToAdd = (newUploadedImages: File[]) => {
    const remainingSpace = MAX_IMAGES - uploadedImages.length;

    if (remainingSpace < 0) return [];

    const imagesToAdd = newUploadedImages.filter((image, index) => {
      if (index < remainingSpace) return image;
    });

    return imagesToAdd;
  };

  const createImagesUrls = (images: File[]) => {
    const urls: { url: string; name: string }[] = [];
    images.forEach((image) =>
      urls.push({ url: URL.createObjectURL(image), name: image.name })
    );
    return urls;
  };

  const setImagesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const uploadedImagesArray = Array.from(event.target.files);
    const imagesToAdd = getImagesToAdd(uploadedImagesArray);
    if (!imagesToAdd.length) return;

    if (uploadedImages.length) {
      const newImages = imagesToAdd.filter((imageToAdd) =>
        uploadedImages.every((image) => image.name !== imageToAdd.name)
      );

      if (!newImages.length) return;

      setImagesUrls((prevState) => {
        return [...prevState, ...createImagesUrls(newImages)];
      });

      setUploadedImages((prevState) => {
        return [...prevState, ...newImages];
      });

      return;
    }

    setImagesUrls(createImagesUrls(imagesToAdd));
    setUploadedImages(imagesToAdd);
  };

  const removeImage = (imageToRemove: string) => {
    const updatedUploadedImages = uploadedImages.filter(
      (image) => image.name !== imageToRemove
    );

    const updatedImagesUrls = imagesUrls.filter(
      (image) => image.name !== imageToRemove
    );

    setImagesUrls(updatedImagesUrls);
    setUploadedImages(updatedUploadedImages);
    uploadInputRef!.current!.value = '';
  };

  const ImageItem = ({ src, id }: { src: string; id: string }) => {
    return (
      <div className={styles.image}>
        <div onClick={() => removeImage(id)} className={styles.remove}>
          <IoClose />
        </div>
        <Image src={src} alt='uploaded image' fill />
      </div>
    );
  };

  const ImagesList = () => {
    return (
      <div className={styles['images-list']}>
        {imagesUrls.map((image) => (
          <ImageItem src={image.url} key={image.name} id={image.name} />
        ))}
        {uploadedImages.length < MAX_IMAGES && (
          <button onClick={startUploadingHandler}>
            <BsPlus />
          </button>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${styles['image-loader']} ${
        areImagesUploaded ? styles.active : ''
      } `}
    >
      <input
        type='file'
        ref={uploadInputRef}
        onChange={setImagesHandler}
        multiple
        style={{ display: 'none' }}
        accept='image/png, image/jpeg'
      />
      {!areImagesUploaded && (
        <Button
          text={'Upload Images'}
          icon={<BsPlus />}
          onClick={startUploadingHandler}
        />
      )}
      {areImagesUploaded && <ImagesList />}
    </div>
  );
};

export default ImageLoader;
