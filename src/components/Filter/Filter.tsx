import CustomCheckbox from '../UI/CustomCheckbox/CustomCheckbox';
import DropdownList from '../UI/DropdownList/DropdownList';
import RangeSlider from './RangeSlider/RangeSlider';
import { useState } from 'react';
import styles from './Filter.module.scss';
import Button from '../UI/Button/Button';

const TEST_DATA = {
  options: ['Audi', 'BMW', 'Mercedes'],
  title: 'Brand',
};

const TEST_DATA2 = {
  options: ['Sedan', 'Coupe'],
  title: 'Chassis Type',
};

const RANGE_DATA = {
  title: 'Production Year Range',
  defaultValue: [2004, 2018],
  range: [1980, 2022],
};

const Filter = () => {
  const [isDamaged, setIsDamaged] = useState(false);
  const [isAccidentFree, setIsAccidentFree] = useState(false);
  const [brand, setBrand] = useState('');
  const [chassis, setChassis] = useState('');
  const [yearRange, setYearRange] = useState(RANGE_DATA.range);

  const brandSelectHandler = (selected: string) => setBrand(selected);
  const chassisSelectHandler = (selected: string) => setChassis(selected);
  const yearRangeSelectHandler = (range: number[]) => setYearRange(range);
  const damagedCheckHandler = (isChecked: boolean) => setIsDamaged(isChecked);
  const accidentFreeCheckHandler = (isChecked: boolean) =>
    setIsAccidentFree(isChecked);

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const searchParams = {
      isDamaged,
      isAccidentFree,
      brand,
      chassis,
      yearRange,
    };

    console.log(searchParams);
  };

  return (
    <form className={styles.filter} onSubmit={searchHandler}>
      <h3>What you're looking for?</h3>
      <div className={styles.dropdowns}>
        <DropdownList
          title={TEST_DATA.title}
          placeholder={TEST_DATA.title}
          options={TEST_DATA.options}
          onSelect={brandSelectHandler}
        />
        <DropdownList
          title={TEST_DATA2.title}
          placeholder={TEST_DATA.title}
          options={TEST_DATA2.options}
          onSelect={chassisSelectHandler}
        />
      </div>
      <RangeSlider
        title={RANGE_DATA.title}
        defaultValue={RANGE_DATA.defaultValue}
        range={RANGE_DATA.range}
        onChange={yearRangeSelectHandler}
      />
      <RangeSlider
        title={RANGE_DATA.title}
        defaultValue={RANGE_DATA.defaultValue}
        range={RANGE_DATA.range}
        onChange={yearRangeSelectHandler}
      />
      <RangeSlider
        title={RANGE_DATA.title}
        defaultValue={RANGE_DATA.defaultValue}
        range={RANGE_DATA.range}
        onChange={yearRangeSelectHandler}
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
