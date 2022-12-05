import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { AuthType, useAuth } from '../../../store/AuthContext';
import { dropdownData, getDropdownData } from '../../../utils/getDropdownData';
import Button from '../../UI/Button/Button';
import CustomCheckbox from '../../UI/CustomCheckbox/CustomCheckbox';
import DropdownList from '../../UI/DropdownList/DropdownList';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './NewListingForm.module.scss';

type Props = {
  onPublish: (listingData: Listing, images: File[]) => void;
};

const NewListingForm = ({ onPublish }: Props) => {
  const [location, setLocation] = useState('');
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

  const [dropdownData, setDropdownData] = useState<dropdownData | null>(null);

  const { user } = useAuth() as AuthType;

  useEffect(() => {
    const fetchDropdownData = async () =>
      setDropdownData(await getDropdownData());
    fetchDropdownData();
  }, []);

  const publishHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    const listingData = {
      location,
      uid: user.uid,
      username: user.displayName as string,
      email: user.email as string,
      photoURL: user.photoURL as string,
      date: Date.now(),
      imageUrls: [],
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
    };

    onPublish(listingData, images);
  };

  const setImagesHandler = (uploadedImages: File[] | []) =>
    setImages(uploadedImages);

  const setDescriptionHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    if (description.length > 300) return;
    setDescription(description);
  };

  const canPublish =
    images.length &&
    brand &&
    model &&
    user &&
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
        {dropdownData && (
          <DropdownList
            options={dropdownData.brands}
            onSelect={(selected) => setBrand(selected)}
          />
        )}
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
        {dropdownData && (
          <DropdownList
            options={dropdownData.gearboxTypes}
            onSelect={(selected) => setGearbox(selected)}
          />
        )}
      </div>
      <div>
        <span className={styles.title}>Drivetrain</span>
        {dropdownData && (
          <DropdownList
            options={dropdownData.drivetrainTypes}
            onSelect={(selected) => setPowertrain(selected)}
          />
        )}
      </div>
      <div>
        <span className={styles.title}>Fuel Type</span>
        {dropdownData && (
          <DropdownList
            options={dropdownData.fuelTypes}
            onSelect={(selected) => setFuelType(selected)}
          />
        )}
      </div>
      <div>
        <span className={styles.title}>Location</span>
        <input
          type='text'
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      <div>
        <span className={styles['description-title']}>Description</span>
        <textarea
          className={styles.description}
          onChange={setDescriptionHandler}
          value={description}
          placeholder={'Describe your vehicle in detail'}
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
            isChecked={isDamaged}
          />
          <CustomCheckbox
            label={'Accident-free'}
            onChange={(isChecked) => setIsAccidentFree(isChecked)}
            dark
            isChecked={isAccidentFree}
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
