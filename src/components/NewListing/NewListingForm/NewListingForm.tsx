import Button from 'components/UI/Button/Button';
import CustomCheckbox from 'components/UI/CustomCheckbox/CustomCheckbox';
import DropdownList from 'components/UI/DropdownList/DropdownList';
import { ChangeEvent, useState } from 'react';

const TEST_DATA = {
  options: ['Audi', 'BMW', 'Mercedes'],
};

const NewListingForm = () => {
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

  const setDescriptionHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const description = event.target.value;
    if (description.length > 250) return;
    setDescription(description);
  };

  const canPublish =
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
    <div>
      <div>
        <span>Brand</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setBrand(selected)}
        />
      </div>
      <div>
        <span>Model</span>
        <input type='text' onChange={(event) => setModel(event.target.value)} />
      </div>
      <div>
        <span>Production Year</span>
        <input
          type='text'
          onChange={(event) => setProductionYear(event.target.value)}
        />
      </div>
      <div>
        <span>Mileage</span>
        <input
          type='text'
          onChange={(event) => setMileage(event.target.value)}
        />
      </div>
      <div>
        <span>Power</span>
        <input type='text' onChange={(event) => setPower(event.target.value)} />
      </div>
      <div>
        <span>Gearbox</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setGearbox(selected)}
        />
      </div>
      <div>
        <span>Powertrain</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setPowertrain(selected)}
        />
      </div>
      <div>
        <span>Fuel Type</span>
        <DropdownList
          options={TEST_DATA.options}
          onSelect={(selected) => setFuelType(selected)}
        />
      </div>
      <div>
        <span>Description</span>
        <input
          type='text'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>
      <div>
        <span>Price</span>
        <input type='text' onChange={(event) => setPrice(event.target.value)} />
      </div>
      <div>
        <span>Vehicle Status</span>
        <div>
          <CustomCheckbox
            label={'Damaged'}
            onChange={(isChecked) => setIsDamaged(isChecked)}
          />
          <CustomCheckbox
            label={'Accident-free'}
            onChange={(isChecked) => setIsAccidentFree(isChecked)}
          />
        </div>
      </div>
      <Button
        text='Publish'
        disabled={!canPublish}
        active={canPublish ? true : false}
      />
    </div>
  );
};

export default NewListingForm;
