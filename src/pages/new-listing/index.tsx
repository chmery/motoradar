import Wrapper from 'components/UI/Wrapper/Wrapper';
import ImageLoader from './ImageLoader/ImageLoader';
import styles from './index.module.scss';

const NewListingPage = () => {
  return (
    <Wrapper>
      <form>
        <h1>Add New Listing</h1>
        <ImageLoader />
      </form>
    </Wrapper>
  );
};

export default NewListingPage;
