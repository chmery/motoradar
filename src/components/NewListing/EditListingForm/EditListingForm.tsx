import { doc, DocumentReference, getDoc } from 'firebase/firestore';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { ranges } from '../../../constants/constants';
import { db } from '../../../firebase/firebase';
import { useDropdownData } from '../../../hooks/useDropdownData';
import Button from '../../UI/Button/Button';
import CustomCheckbox from '../../UI/CustomCheckbox/CustomCheckbox';
import DropdownList from '../../UI/DropdownList/DropdownList';
import ImageLoader from '../ImageLoader/ImageLoader';
import styles from './EditListingForm.module.scss';

type Props = {
  onPublish: (listingData: Listing, images: File[]) => void;
  isLoading: boolean;
  editId: string;
};

const EditListingForm = ({ onPublish, isLoading, editId }: Props) => {
  const [images, setImages] = useState<File[] | []>([]);

  const { POWER, MILEAGE, PRICE } = ranges;
  const { gearboxTypes, drivetrainTypes, productionYears, fuelTypes, brands } =
    useDropdownData();

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

  const setImagesHandler = (uploadedImages: File[] | []) =>
    setImages(uploadedImages);

  const numInputsHandler = (
    event: ChangeEvent<HTMLInputElement>,
    input: string
  ) => {
    const value = event.target.value.replace(/\D/g, '');
    const numValue = Number(value);

    if (value === '0' || !dataToEdit) return;

    if (input === 'power' && numValue <= POWER.max)
      setDataToEdit({ ...dataToEdit, power: value });
    if (input === 'mileage' && numValue <= MILEAGE.max)
      setDataToEdit({ ...dataToEdit, mileage: numValue });
    if (input === 'price' && numValue <= PRICE.max)
      setDataToEdit({ ...dataToEdit, price: numValue });
  };

  const canPublish = false;

  const publishHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!dataToEdit) return;
    onPublish(dataToEdit, images);
  };

  if (!dataToEdit) return;

  return (
    <form className={styles['new-listing-form']} onSubmit={publishHandler}>
      <h1>Edit listing</h1>
      <ImageLoader onImageUpload={setImagesHandler} />
      <div>
        <span className={styles.title}>Brand</span>
        <DropdownList
          options={brands}
          placeholder={'Brand'}
          value={dataToEdit.brand}
          onSelect={(selected) =>
            setDataToEdit({ ...dataToEdit, brand: selected as string })
          }
        />
      </div>

      <div>
        <span className={styles.title}>Model</span>
        <input
          type='text'
          maxLength={40}
          value={dataToEdit.model}
          onChange={(event) =>
            setDataToEdit({ ...dataToEdit, model: event.target.value })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Production Year</span>
        <DropdownList
          options={productionYears}
          placeholder={'Production Year'}
          value={dataToEdit.productionYear}
          onSelect={(selected) =>
            setDataToEdit({ ...dataToEdit, productionYear: selected as number })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Mileage</span>
        <input
          type='text'
          value={dataToEdit.mileage}
          onChange={(event) => numInputsHandler(event, 'mileage')}
        />
      </div>
      <div>
        <span className={styles.title}>Power</span>
        <input
          type='text'
          value={dataToEdit.power}
          onChange={(event) => numInputsHandler(event, 'power')}
        />
      </div>
      <div>
        <span className={styles.title}>Gearbox</span>
        <DropdownList
          options={gearboxTypes}
          placeholder={'Gearbox'}
          value={dataToEdit.gearbox}
          onSelect={(selected) =>
            setDataToEdit({ ...dataToEdit, gearbox: selected as string })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Drivetrain</span>
        <DropdownList
          options={drivetrainTypes}
          placeholder={'Drivetrain'}
          value={dataToEdit.powertrain}
          onSelect={(selected) =>
            setDataToEdit({ ...dataToEdit, powertrain: selected as string })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Fuel Type</span>
        <DropdownList
          options={fuelTypes}
          placeholder={'Fuel Type'}
          value={dataToEdit.fuelType}
          onSelect={(selected) =>
            setDataToEdit({ ...dataToEdit, fuelType: selected as string })
          }
        />
      </div>
      <div>
        <span className={styles.title}>Location</span>
        <input
          type='text'
          maxLength={40}
          value={dataToEdit.location}
          onChange={(event) =>
            setDataToEdit({ ...dataToEdit, location: event.target.value })
          }
        />
      </div>
      <div>
        <span className={styles['description-title']}>Description</span>
        <textarea
          maxLength={300}
          className={styles.description}
          onChange={(event) =>
            setDataToEdit({ ...dataToEdit, description: event.target.value })
          }
          value={dataToEdit.description}
          placeholder={'Describe your vehicle in detail'}
        />
      </div>
      <div>
        <span className={styles.title}>Price</span>
        <input
          type='text'
          value={dataToEdit.price}
          onChange={(event) => numInputsHandler(event, 'price')}
        />
      </div>
      <div className={styles.status}>
        <span className={styles.title}>Vehicle Status</span>
        <div className={styles.checkboxes}>
          <CustomCheckbox
            label={'Damaged'}
            onChange={(isChecked) =>
              setDataToEdit({ ...dataToEdit, isDamaged: isChecked })
            }
            dark
            isChecked={dataToEdit.isDamaged}
          />
          <CustomCheckbox
            label={'Accident-free'}
            onChange={(isChecked) =>
              setDataToEdit({ ...dataToEdit, isAccidentFree: isChecked })
            }
            dark
            isChecked={dataToEdit.isAccidentFree}
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

export default EditListingForm;
