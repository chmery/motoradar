import CustomCheckbox from '../UI/CustomCheckbox/CustomCheckbox';
import DropdownList from '../UI/DropdownList/DropdownList';
import RangeSlider from './RangeSlider/RangeSlider';
import { useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../UI/Button/Button';
import { useDropdownData } from '../../hooks/useDropdownData';
import { ranges } from '../../constants/constants';
import { useRouter } from 'next/router';

const Filter = () => {
  const router = useRouter();

  const { PRICE, PRODUCTION_YEAR, MILEAGE } = ranges;
  const { brands, drivetrainTypes } = useDropdownData();

  const [isDamaged, setIsDamaged] = useState(false);
  const [isAccidentFree, setIsAccidentFree] = useState(false);
  const [brand, setBrand] = useState('');
  const [drivetrain, setDrivetrain] = useState('');
  const [yearRange, setYearRange] = useState<number[]>([
    PRODUCTION_YEAR.min,
    PRODUCTION_YEAR.max,
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([
    PRICE.min,
    PRICE.max,
  ]);
  const [mileageRange, setMileageRange] = useState<number[]>([
    MILEAGE.min,
    MILEAGE.max,
  ]);

  const brandSelectHandler = (selected: string) => setBrand(selected);
  const drivetrainSelectHandler = (selected: string) => setDrivetrain(selected);
  const yearRangeSelectHandler = (range: number[]) => setYearRange(range);
  const mileageRangeSelectHandler = (range: number[]) => setMileageRange(range);
  const priceRangeSelectHandler = (range: number[]) => setPriceRange(range);

  const damagedCheckHandler = (isChecked: boolean) => setIsDamaged(isChecked);
  const accidentFreeCheckHandler = (isChecked: boolean) =>
    setIsAccidentFree(isChecked);

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();

    router.push({
      pathname: '/results',
      query: {
        brand,
        drivetrain,
        isDamaged,
        isAccidentFree,
        yearFrom: yearRange[0],
        yearTo: yearRange[1],
        priceFrom: priceRange[0],
        priceTo: priceRange[1],
        mileageFrom: mileageRange[0],
        mileageTo: mileageRange[1],
      },
    });
  };

  return (
    <form className={styles.filter} onSubmit={searchHandler}>
      <h3>What you're looking for?</h3>
      <div className={styles.dropdowns}>
        <DropdownList
          title={'Brand'}
          placeholder={'Brand'}
          options={brands}
          onSelect={brandSelectHandler}
          dark
        />
        <DropdownList
          title={'Drivetrain'}
          placeholder={'Drivetrain'}
          options={drivetrainTypes}
          onSelect={drivetrainSelectHandler}
          dark
        />
      </div>
      <RangeSlider
        title={'Production Year'}
        defaultValue={PRODUCTION_YEAR.midRange}
        range={PRODUCTION_YEAR.range}
        onChange={yearRangeSelectHandler}
      />
      <RangeSlider
        title={'Mileage'}
        defaultValue={MILEAGE.midRange}
        range={MILEAGE.range}
        onChange={mileageRangeSelectHandler}
        step={10000}
      />
      <RangeSlider
        title={'Price'}
        defaultValue={PRICE.midRange}
        range={PRICE.range}
        onChange={priceRangeSelectHandler}
        step={1000}
      />
      <div className={styles.checkboxes}>
        <CustomCheckbox label={'damaged'} onChange={damagedCheckHandler} />
        <CustomCheckbox
          label={'accident-free'}
          onChange={accidentFreeCheckHandler}
        />
      </div>
      <Button text='Search' type='submit' active />
    </form>
  );
};

export default Filter;
