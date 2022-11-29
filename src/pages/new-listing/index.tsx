import NewListingForm from 'components/NewListing/NewListingForm/NewListingForm';
import Wrapper from 'components/UI/Wrapper/Wrapper';

const NewListingPage = () => {
  const publishHandler = (listingData: Listing) => {
    console.log(listingData);
  };

  return (
    <Wrapper>
      <NewListingForm onPublish={publishHandler} />
    </Wrapper>
  );
};

export default NewListingPage;
