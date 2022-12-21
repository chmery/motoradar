import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { initialNewListingState, ranges } from '../../../constants/constants';
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
  onEdit: (listingData: Listing, images: EditImages) => void;
  isLoading: boolean;
  editId: string;
};

export type EditImages = {
  new: File[];
  old?: string[];
};

const NewListingForm = ({ onPublish, isLoading, editId, onEdit }: Props) => {
  const [images, setImages] = useState<File[] | []>([]);
  const [editImages, setEditImages] = useState<EditImages | null>(null);

  const [listingData, setListingData] = useState<Listing>(
    initialNewListingState
  );

  const [isEditing, setIsEditing] = useState(false);

  const {
    mileage,
    brand,
    power,
    location,
    gearbox,
    powertrain,
    model,
    description,
    price,
    isDamaged,
    isAccidentFree,
    productionYear,
    fuelType,
  } = listingData;
  const { POWER, MILEAGE, PRICE } = ranges;
  const { gearboxTypes, drivetrainTypes, productionYears, fuelTypes, brands } =
    useDropdownData();

  const { userData } = useAuth() as AuthType;

  const islistingDataFilled = Object.values(listingData).every(
    (value) => value !== 0 && value !== ''
  );

  const areImagesUploaded = () => {
    if (isEditing && editImages) {
      return editImages.new.length > 0 ? true : false;
    }

    return images.length ? true : false;
  };

  const canPublish = areImagesUploaded() && islistingDataFilled;

  const setImagesHandler = (uploadedImages: File[] | []) => {
    isEditing
      ? setEditImages({ new: uploadedImages, old: listingData.imageUrls })
      : setImages(uploadedImages);
  };

  const numInputsHandler = (
    event: ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = event.target.value.replace(/\D/g, '');
    const numValue = Number(value);

    if (value === '0') return;

    if (input === 'power' && numValue <= POWER.max)
      setListingData({ ...listingData, power: value });
    if (input === 'mileage' && numValue <= MILEAGE.max)
      setListingData({ ...listingData, mileage: numValue });
    if (input === 'price' && numValue <= PRICE.max)
      setListingData({ ...listingData, price: numValue });
  };

  const publishHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const completedListingData = {
      ...listingData,
      uid: userData!.uid,
      date: Date.now(),
    };

    isEditing
      ? onEdit(completedListingData, editImages!)
      : onPublish(completedListingData, images);
  };

  useEffect(() => {
    if (!editId) return;
    setIsEditing(true);

    const fetchDataToEdit = async () => {
      const docRef = doc(db, 'listings', editId) as DocumentReference<Listing>;
      const docSnap = await getDoc(docRef);
      const dataToEdit = docSnap.data();
      if (dataToEdit) setListingData(dataToEdit);
    };
    fetchDataToEdit();
  }, [editId]);

  return (
    <form className={styles['new-listing-form']} onSubmit={publishHandler}>
      <h1>Add New Listing</h1>
      <ImageLoader
        onImageUpload={setImagesHandler}
        imagesFromStorage={editId ? listingData.imageUrls : undefined}
      />
      <div>
        <span className={styles.title}>Brand</span>
        <DropdownList
          options={brands}
          value={brand}
          placeholder={'Brand'}
          onSelect={(selected) =>
            setListingData({ ...listingData, brand: selected as string })
          }
        />
      </div>

      <div>
        <span className={styles.title}>Model</span>
        <input
          type='text'
          value={model}
          maxLength={40}
          onChange={(event) =>
            setListingData({ ...listingData, model: event.target.value })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Production Year</span>
        <DropdownList
          options={productionYears}
          value={productionYear}
          placeholder={'Production Year'}
          onSelect={(selected) =>
            setListingData({
              ...listingData,
              productionYear: selected as number,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Mileage</span>
        <input
          type='text'
          value={mileage === 0 ? '' : mileage}
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
          value={gearbox}
          placeholder={'Gearbox'}
          onSelect={(selected) =>
            setListingData({
              ...listingData,
              gearbox: selected as string,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Drivetrain</span>
        <DropdownList
          options={drivetrainTypes}
          value={powertrain}
          placeholder={'Drivetrain'}
          onSelect={(selected) =>
            setListingData({
              ...listingData,
              powertrain: selected as string,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Fuel Type</span>
        <DropdownList
          options={fuelTypes}
          value={fuelType}
          placeholder={'Fuel Type'}
          onSelect={(selected) =>
            setListingData({
              ...listingData,
              fuelType: selected as string,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Location</span>
        <input
          type='text'
          value={location}
          maxLength={40}
          onChange={(event) =>
            setListingData({
              ...listingData,
              location: event.target.value,
            })
          }
        />
      </div>
      <div>
        <span className={styles['description-title']}>Description</span>
        <textarea
          maxLength={300}
          className={styles.description}
          onChange={(event) =>
            setListingData({
              ...listingData,
              description: event.target.value,
            })
          }
          value={description}
          placeholder={'Describe your vehicle in detail'}
        />
      </div>
      <div>
        <span className={styles.title}>Price</span>
        <input
          type='text'
          value={price === 0 ? '' : price}
          onChange={(event) => numInputsHandler(event, 'price')}
        />
      </div>
      <div className={styles.status}>
        <span className={styles.title}>Vehicle Status</span>
        <div className={styles.checkboxes}>
          <CustomCheckbox
            label={'Damaged'}
            onChange={(isChecked) =>
              setListingData({ ...listingData, isDamaged: isChecked })
            }
            dark
            isChecked={isDamaged}
          />
          <CustomCheckbox
            label={'Accident-free'}
            onChange={(isChecked) =>
              setListingData({
                ...listingData,
                isAccidentFree: isChecked,
              })
            }
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
