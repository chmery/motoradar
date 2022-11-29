import Button from 'components/UI/Button/Button';
import CustomCheckbox from 'components/UI/CustomCheckbox/CustomCheckbox';
import DropdownList from 'components/UI/DropdownList/DropdownList';
import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthType, useAuth } from 'store/AuthContext';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './NewListingForm.module.scss';

const TEST_DATA = {
  options: ['Audi', 'BMW', 'Mercedes'],
};

type Props = {
  onPublish: (listingData: Listing) => void;
};

const NewListingForm = ({ onPublish }: Props) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [mileage, setMileage] = useState('');
  const [power, setPower] = useState('');
  const [powertrain, setPowertrain] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isDamaged, setIsDamaged] = useState(false);
  const [isAccidentFree, setIsAccidentFree] = useState(false);
  const [images, setImages] = useState<File[] | []>([]);

  //const { user } = useAuth() as AuthType;

  const publishHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const listingData = {
      uid: user.uid,
      date: Date.now(),
      brand,
      model,
      productionYear,
      mileage,
      power,
      powertrain,
      gearbox,
      fuelType,
      description,
      price,
      isDamaged,
      isAccidentFree,
      images,
    };

    onPublish(listingData);
  };

  const setImagesHandler = (uploadedImages: File[] | []) =>
    setImages(uploadedImages);

  const setDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    if (description.length > 250) return;
    setDescription(description);
  };

  const canPublish =
    images.length &&
    brand &&
    model &&
    productionYear &&
    mileage &&
    power &&
    powertrain &&
    gearbox &&
    fuelType &&
    description &&
    price &&
    (isDamaged || isAccidentFree)
      ? true
      : false;

  return (
    <form className={styles['new-listing-form']} onSubmit={publishHandler}>
      <h1>Add New Listing</h1>
      <ImageLoader onImageUpload={setImagesHandler} />
      <div>
        <span className={styles.title}>Brand</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setBrand(selected)}
        />
      </div>
      <div>
        <span className={styles.title}>Model</span>
        <input type='text' onChange={(event) => setModel(event.target.value)} />
      </div>
      <div>
        <span className={styles.title}>Production Year</span>
        <input
          type='number'
          onChange={(event) => setProductionYear(event.target.value)}
        />
      </div>
      <div>
        <span className={styles.title}>Mileage</span>
        <input
          type='number'
          onChange={(event) => setMileage(event.target.value)}
        />
      </div>
      <div>
        <span className={styles.title}>Power</span>
        <input
          type='number'
          onChange={(event) => setPower(event.target.value)}
        />
      </div>
      <div>
        <span className={styles.title}>Gearbox</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setGearbox(selected)}
        />
      </div>
      <div>
        <span className={styles.title}>Powertrain</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setPowertrain(selected)}
        />
      </div>
      <div>
        <span className={styles.title}>Fuel Type</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setFuelType(selected)}
        />
      </div>
      <div>
        <span className={styles.title}>Description</span>
        <input
          type='text'
          value={description}
          onChange={setDescriptionHandler}
        />
      </div>
      <div>
        <span className={styles.title}>Price</span>
        <input
          type='number'
          onChange={(event) => setPrice(event.target.value)}
        />
      </div>
      <div className={styles.status}>
        <span className={styles.title}>Vehicle Status</span>
        <div className={styles.checkboxes}>
          <CustomCheckbox
            label={'Damaged'}
            onChange={(isChecked) => setIsDamaged(isChecked)}
            dark
          />
          <CustomCheckbox
            label={'Accident-free'}
            onChange={(isChecked) => setIsAccidentFree(isChecked)}
            dark
          />
        </div>
      </div>
      <Button
        type='submit'
        text='Publish'
        disabled={!canPublish}
        active={canPublish ? true : false}
      />
    </form>
  );
};

export default NewListingForm;
