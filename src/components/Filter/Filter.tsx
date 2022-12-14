import CustomCheckbox from '../UI/CustomCheckbox/CustomCheckbox';
import DropdownList from '../UI/DropdownList/DropdownList';
import RangeSlider from './RangeSlider/RangeSlider';
import { useEffect, useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../UI/Button/Button';
import { useDropdownData } from '../../hooks/useDropdownData';
import { ranges } from '../../constants/constants';
import { useRouter } from 'next/router';

type Props = {
  closeMenu?: () => void;
};

const Filter = ({ closeMenu }: Props) => {
  const router = useRouter();

  const { PRICE, PRODUCTION_YEAR, MILEAGE } = ranges;
  const { brands, drivetrainTypes } = useDropdownData();

  const [isDamaged, setIsDamaged] = useState(
    router.query.isDamaged === 'true' || false
  );
  const [isAccidentFree, setIsAccidentFree] = useState(
    router.query.isAccidentFree === 'true' || false
  );
  const [brand, setBrand] = useState(router.query.brand || '');
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

  const handleClearSearch = () => {
    setBrand('');
    setDrivetrain('');
    setYearRange([PRODUCTION_YEAR.min, PRODUCTION_YEAR.max]);
    setMileageRange([MILEAGE.min, MILEAGE.max]);
    setPriceRange([PRICE.min, PRICE.max]);
    setIsAccidentFree(false);
    setIsDamaged(false);
  };

  let yearRangeDefault = yearRange;
  if (router.query.yearFrom && router.query.yearTo) {
    yearRangeDefault = [+router.query.yearFrom, +router.query.yearTo];
  }
  let mileageRangeDefault = mileageRange;
  if (router.query.mileageFrom && router.query.mileageTo) {
    mileageRangeDefault = [+router.query.mileageFrom, +router.query.mileageTo];
  }
  let priceRangeDefault = priceRange;
  if (router.query.priceFrom && router.query.priceTo) {
    priceRangeDefault = [+router.query.priceFrom, +router.query.priceTo];
  }

  useEffect(() => {}, [router.query]);

  return (
    <form
      className={`${styles.filter} ${router.pathname !== '/' && styles.dark}`}
      onSubmit={searchHandler}
    >
      <h3>{router.pathname === '/' ? `What you're looking for?` : `Filter`}</h3>
      <div className={styles.dropdowns}>
        <DropdownList
          title={'Brand'}
          placeholder={(router.query.brand as string) || 'Brand'}
          options={brands}
          onSelect={(selected) => brandSelectHandler(selected as string)}
          dark={router.pathname === '/'}
        />
        <DropdownList
          title={'Drivetrain'}
          placeholder={(router.query.drivetrain as string) || 'Drivetrain'}
          options={drivetrainTypes}
          onSelect={(selected) => drivetrainSelectHandler(selected as string)}
          dark={router.pathname === '/'}
        />
      </div>
      <RangeSlider
        title={'Production Year'}
        defaultValue={yearRangeDefault}
        range={PRODUCTION_YEAR.range}
        onChange={yearRangeSelectHandler}
      />
      <RangeSlider
        title={'Mileage (km)'}
        defaultValue={mileageRangeDefault}
        range={MILEAGE.range}
        onChange={mileageRangeSelectHandler}
        step={10000}
      />
      <RangeSlider
        title={'Price ($)'}
        defaultValue={priceRangeDefault}
        range={PRICE.range}
        onChange={priceRangeSelectHandler}
        step={1000}
      />
      <div className={styles.checkboxes}>
        <CustomCheckbox
          label={'damaged'}
          onChange={damagedCheckHandler}
          isChecked={isDamaged}
          dark={router.pathname !== '/'}
        />
        <CustomCheckbox
          label={'accident-free'}
          onChange={accidentFreeCheckHandler}
          isChecked={isAccidentFree}
          dark={router.pathname !== '/'}
        />
      </div>
      <Button text='Search' type='submit' active onClick={closeMenu} />
      {router.pathname !== '/' && (
        <button
          className={styles.clear}
          onClick={() => {
            handleClearSearch();
            if (closeMenu) {
              closeMenu();
            }
          }}
        >
          Clear
        </button>
      )}
    </form>
  );
};

export default Filter;
