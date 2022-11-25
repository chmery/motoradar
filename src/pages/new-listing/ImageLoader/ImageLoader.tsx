import Button from 'components/UI/Button/Button';
import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import { BsPlus } from 'react-icons/bs';
import styles from './ImageLoader.module.scss';
import { IoClose } from 'react-icons/io5';

const ImageLoader = () => {
  const [uploadedImages, setUploadedImages] = useState<File[] | []>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const startUploadingHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!uploadInputRef.current) return;
    uploadInputRef.current.click();
  };

  const setImagesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const uploadedImagesArray = Array.from(event.target.files);

    if (uploadedImages.length) {
      const newImages = uploadedImagesArray.filter((newImage) =>
        uploadedImages.every((image) => image.name !== newImage.name)
      );

      if (!newImages.length) return;

      setUploadedImages((prevState) => {
        return [...prevState, ...newImages];
      });

      return;
    }

    setUploadedImages(uploadedImagesArray);
  };

  const removeImage = (imageToRemove: string) => {
    const updatedUploadedImages = uploadedImages.filter(
      (image) => image.name !== imageToRemove
    );
    setUploadedImages(updatedUploadedImages);
    uploadInputRef!.current!.value = '';
  };

  const ImageItem = ({ src, id }: { src: string; id: string }) => {
    return (
      <div className={styles.image}>
        <div onClick={() => removeImage(id)} className={styles.remove}>
          <IoClose />
        </div>
        <img src={src}></img>
      </div>
    );
  };

  const ImagesList = () => {
    return (
      <div className={styles['images-list']}>
        {uploadedImages.map((image) => (
          <ImageItem
            src={URL.createObjectURL(image)}
            key={image.name}
            id={image.name}
          />
        ))}
        <button onClick={startUploadingHandler}>
          <BsPlus />
        </button>
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
