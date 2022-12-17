import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ranges } from '../../../constants/constants';
import { db } from '../../../firebase/firebase';
import { useDropdownData } from '../../../hooks/useDropdownData';
import { AuthType, useAuth } from '../../../store/AuthContext';
import Button from '../../UI/Button/Button';
import CustomCheckbox from '../../UI/CustomCheckbox/CustomCheckbox';
import DropdownList from '../../UI/DropdownList/DropdownList';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './NewListingForm.module.scss';

type Props = {
  onPublish: (listingData: Listing, images: File[]) => void;
  isLoading: boolean;
  editId: string;
};

const NewListingForm = ({ onPublish, isLoading, editId }: Props) => {
  const [location, setLocation] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [productionYear, setProductionYear] = useState<number>();
  const [mileage, setMileage] = useState<number>();
  const [power, setPower] = useState('');
  const [powertrain, setPowertrain] = useState('');
  const [gearbox, setGearbox] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>();
  const [isDamaged, setIsDamaged] = useState(false);
  const [isAccidentFree, setIsAccidentFree] = useState(false);
  const [images, setImages] = useState<File[] | []>([]);

  const { userData } = useAuth() as AuthType;
  const { POWER, MILEAGE, PRICE } = ranges;
  const { gearboxTypes, drivetrainTypes, productionYears, fuelTypes, brands } =
    useDropdownData();

  // Edit part
  const [dataToEdit, setDataToEdit] = useState<Listing | null>(null);

  useEffect(() => {
    if (!editId) return;

    const fetchDataToEdit = async () => {
      const docRef = doc(db, 'listings', editId) as DocumentReference<Listing>;
      const docSnap = await getDoc(docRef);
      const dataToEdit = docSnap.data();
      if (dataToEdit) setDataToEdit(dataToEdit);
    };

    fetchDataToEdit();
  }, []);

  console.log(dataToEdit);
  const setImagesHandler = (uploadedImages: File[] | []) =>
    setImages(uploadedImages);

  const numInputsHandler = (
    event: ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = event.target.value.replace(/\D/g, '');
    const numValue = Number(value);

    if (value === '0') return;

    if (input === 'power' && numValue <= POWER.max) setPower(value);
    if (input === 'mileage' && numValue <= MILEAGE.max) setMileage(numValue);
    if (input === 'price' && numValue <= PRICE.max) setPrice(numValue);
  };

  const canPublish =
    images.length &&
    brand &&
    model &&
    userData &&
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

  const publishHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!userData) return;

    const listingData = {
      location,
      uid: userData.uid,
      date: Date.now(),
      imageUrls: [],
      brand,
      model,
      productionYear: productionYear!,
      mileage: mileage!,
      price: price!,
      power,
      powertrain,
      gearbox,
      fuelType,
      description,
      isDamaged,
      isAccidentFree,
    };

    onPublish(listingData, images);
  };

  return (
    <form className={styles['new-listing-form']} onSubmit={publishHandler}>
      <h1>Add New Listing</h1>
      <ImageLoader onImageUpload={setImagesHandler} />
      <div>
        <span className={styles.title}>Brand</span>
        <DropdownList
          options={brands}
          placeholder={'Brand'}
          onSelect={(selected) => setBrand(selected as string)}
        />
      </div>

      <div>
        <span className={styles.title}>Model</span>
        <input
          type='text'
          maxLength={40}
          onChange={(event) => setModel(event.target.value)}
        />
      </div>
      <div>
        <span className={styles.title}>Production Year</span>
        <DropdownList
          options={productionYears}
          placeholder={'Production Year'}
          onSelect={(selected) => setProductionYear(selected as number)}
        />
      </div>
      <div>
        <span className={styles.title}>Mileage</span>
        <input
          type='text'
          value={mileage}
          onChange={(event) => numInputsHandler(event, 'mileage')}
        />
      </div>
      <div>
        <span className={styles.title}>Power</span>
        <input
          type='text'
          value={power}
          onChange={(event) => numInputsHandler(event, 'power')}
        />
      </div>
      <div>
        <span className={styles.title}>Gearbox</span>
        <DropdownList
          options={gearboxTypes}
          placeholder={'Gearbox'}
          onSelect={(selected) => setGearbox(selected as string)}
        />
      </div>
      <div>
        <span className={styles.title}>Drivetrain</span>
        <DropdownList
          options={drivetrainTypes}
          placeholder={'Drivetrain'}
          onSelect={(selected) => setPowertrain(selected as string)}
        />
      </div>
      <div>
        <span className={styles.title}>Fuel Type</span>
        <DropdownList
          options={fuelTypes}
          placeholder={'Fuel Type'}
          onSelect={(selected) => setFuelType(selected as string)}
        />
      </div>
      <div>
        <span className={styles.title}>Location</span>
        <input
          type='text'
          maxLength={40}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      <div>
        <span className={styles['description-title']}>Description</span>
        <textarea
          maxLength={300}
          className={styles.description}
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          placeholder={'Describe your vehicle in detail'}
        />
      </div>
      <div>
        <span className={styles.title}>Price</span>
        <input
          type='text'
          value={price}
          onChange={(event) => numInputsHandler(event, 'price')}
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
        isLoading={isLoading}
      />
    </form>
  );
};

export default NewListingForm;
