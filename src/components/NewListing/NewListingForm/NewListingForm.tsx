import { ChangeEvent, FormEvent, useState } from 'react';
import { initialNewListingState, ranges } from '../../../constants/constants';
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
};

const NewListingForm = ({ onPublish, isLoading }: Props) => {
  const [images, setImages] = useState<File[] | []>([]);
  const [newListingData, setNewListingData] = useState<Listing>(
    initialNewListingState
  );

  const { mileage, power, description, price, isDamaged, isAccidentFree } =
    newListingData;

  const { POWER, MILEAGE, PRICE } = ranges;
  const { gearboxTypes, drivetrainTypes, productionYears, fuelTypes, brands } =
    useDropdownData();

  const { userData } = useAuth() as AuthType;

  const isNewListingDataFilled = Object.values(newListingData).every(
    (value) => value !== 0 && value !== ''
  );

  const canPublish = images.length && isNewListingDataFilled;

  const setImagesHandler = (uploadedImages: File[] | []) =>
    setImages(uploadedImages);

  const numInputsHandler = (
    event: ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = event.target.value.replace(/\D/g, '');
    const numValue = Number(value);

    if (value === '0') return;

    if (input === 'power' && numValue <= POWER.max)
      setNewListingData({ ...newListingData, power: value });
    if (input === 'mileage' && numValue <= MILEAGE.max)
      setNewListingData({ ...newListingData, mileage: numValue });
    if (input === 'price' && numValue <= PRICE.max)
      setNewListingData({ ...newListingData, price: numValue });
  };

  const publishHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setNewListingData({
      ...newListingData,
      uid: userData!.uid,
      date: Date.now(),
    });

    onPublish(newListingData, images);
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
          onSelect={(selected) =>
            setNewListingData({ ...newListingData, brand: selected as string })
          }
        />
      </div>

      <div>
        <span className={styles.title}>Model</span>
        <input
          type='text'
          maxLength={40}
          onChange={(event) =>
            setNewListingData({ ...newListingData, model: event.target.value })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Production Year</span>
        <DropdownList
          options={productionYears}
          placeholder={'Production Year'}
          onSelect={(selected) =>
            setNewListingData({
              ...newListingData,
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
          placeholder={'Gearbox'}
          onSelect={(selected) =>
            setNewListingData({
              ...newListingData,
              gearbox: selected as string,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Drivetrain</span>
        <DropdownList
          options={drivetrainTypes}
          placeholder={'Drivetrain'}
          onSelect={(selected) =>
            setNewListingData({
              ...newListingData,
              powertrain: selected as string,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Fuel Type</span>
        <DropdownList
          options={fuelTypes}
          placeholder={'Fuel Type'}
          onSelect={(selected) =>
            setNewListingData({
              ...newListingData,
              fuelType: selected as string,
            })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Location</span>
        <input
          type='text'
          maxLength={40}
          onChange={(event) =>
            setNewListingData({
              ...newListingData,
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
            setNewListingData({
              ...newListingData,
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
              setNewListingData({ ...newListingData, isDamaged: isChecked })
            }
            dark
            isChecked={isDamaged}
          />
          <CustomCheckbox
            label={'Accident-free'}
            onChange={(isChecked) =>
              setNewListingData({
                ...newListingData,
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
