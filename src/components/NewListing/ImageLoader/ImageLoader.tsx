import { ChangeEvent, useRef, useState, MouseEvent, useEffect } from 'react';
import { BsPlus } from 'react-icons/bs';
import styles from './ImageLoader.module.scss';
import { IoClose } from 'react-icons/io5';
import Button from '../../UI/Button/Button';

type Props = {
  onImageUpload: (images: File[] | []) => void;
};

const ImageLoader = ({ onImageUpload }: Props) => {
  const [uploadedImages, setUploadedImages] = useState<File[] | []>([]);
  const [imagesUrls, setImagesUrls] = useState<{ url: string; name: string }[]>(
    []
  );

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const MAX_IMAGES = 12;

  useEffect(() => {
    onImageUpload(uploadedImages);
  }, [uploadedImages]);

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
      const newImages = imagesToAdd.filter((newImage) =>
        uploadedImages.every((image) => image.name !== newImage.name)
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
        <img src={src} />
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
        uploadedImages.length ? styles.active : ''
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
      {!uploadedImages.length && (
        <Button
          text={'Upload Images'}
          icon={<BsPlus />}
          onClick={startUploadingHandler}
        />
      )}
      {uploadedImages.length > 0 && <ImagesList />}
    </div>
  );
};

export default ImageLoader;
