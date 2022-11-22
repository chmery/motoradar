import Button from 'components/UI/Button/Button';
import { ChangeEvent, useRef, useState, MouseEvent } from 'react';
import { BsPlus } from 'react-icons/bs';
import styles from './ImageLoader.module.scss';

const ImageLoader = () => {
  const [uploadedImages, setUploadedImages] = useState<string[] | null>(null);

  const uploadInputRef = useRef<HTMLInputElement>(null);

  const startUploadingHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!uploadInputRef.current) return;
    uploadInputRef.current.click();
  };

  const setImagesHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const uploadedImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedImages(uploadedImages);
  };

  const removeImage = (imageToRemove: string) => {
    const updatedUploadedImages = uploadedImages!.filter(
      (image) => image !== imageToRemove
    );
    setUploadedImages(updatedUploadedImages);
  };

  const ImageItem = ({ src }: { src: string }) => {
    return (
      <div key={src}>
        <span onClick={() => removeImage(src)}>delete</span>
        <img src={src}></img>
      </div>
    );
  };

  return (
    <div className={styles['image-loader']}>
      <input
        type='file'
        ref={uploadInputRef}
        onChange={setImagesHandler}
        multiple
        style={{ display: 'none' }}
        accept='image/png, image/jpeg'
      />
      {!uploadedImages?.length && (
        <Button
          text={'Upload Images'}
          icon={<BsPlus />}
          onClick={startUploadingHandler}
        />
      )}
      {uploadedImages &&
        uploadedImages.map((image) => <ImageItem src={image} />)}
    </div>
  );
};

export default ImageLoader;
