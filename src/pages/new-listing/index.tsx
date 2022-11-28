import NewListingForm from 'components/NewListing/NewListingForm/NewListingForm';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import { useState } from 'react';
import ImageLoader from '../../components/NewListing/ImageLoader/ImageLoader';
import styles from './index.module.scss';

const NewListingPage = () => {
  const [images, setImages] = useState<File[] | []>([]);

  const setImagesHandler = (uploadedImages: File[] | []) =>
    setImages(uploadedImages);

  return (
    <Wrapper>
      <form>
        <h1>Add New Listing</h1>
        <ImageLoader onImageUpload={setImagesHandler} />
        <NewListingForm />
      </form>
    </Wrapper>
  );
};

export default NewListingPage;
