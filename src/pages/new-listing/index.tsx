import NewListingForm from 'components/NewListing/NewListingForm/NewListingForm';
import Wrapper from 'components/UI/Wrapper/Wrapper';
import styles from './index.module.scss';

const NewListingPage = () => {
  return (
    <Wrapper>
      <form className={styles.form}>
        <NewListingForm />
      </form>
    </Wrapper>
  );
};

export default NewListingPage;
