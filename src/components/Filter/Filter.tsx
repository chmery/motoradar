import CustomCheckbox from './CustomCheckbox/CustomCheckbox'
import DropdownList from './DropdownList/DropdownList'
import RangeSlider from './RangeSlider/RangeSlider'
import { useState } from 'react'
import styles from './Filter.module.scss'
import Button from 'components/UI/Button/Button'

const TEST_DATA = {
  options: ['Audi', 'BMW', 'Mercedes'],
  title: 'Brand',
}

const TEST_DATA2 = {
  options: ['Sedan', 'Coupe'],
  title: 'Chassis Type',
}

const RANGE_DATA = {
  title: 'Production Year Range',
  defaultValue: [2004, 2018],
  range: [1980, 2022],
}

const Filter = () => {
  const [isDamaged, setIsDamaged] = useState(false)
  const [brand, setBrand] = useState('')
  const [chassis, setChassis] = useState('')
  const [yearRange, setYearRange] = useState(RANGE_DATA.range)

  const brandSelectHandler = (selected: string) => setBrand(selected)
  const chassisSelectHandler = (selected: string) => setChassis(selected)
  const yearRangeSelectHandler = (range: number[]) => setYearRange(range)
  const damagedCheckHandler = (isChecked: boolean) => setIsDamaged(isChecked)

  const searchHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const searchParams = {
      isDamaged,
      brand,
      chassis,
      yearRange,
    }

    console.log(searchParams)
  }

  return (
    <form className={styles.filter} onSubmit={searchHandler}>
      <h3>What you're looking for?</h3>
      <DropdownList
        title={TEST_DATA.title}
        options={TEST_DATA.options}
        onSelect={brandSelectHandler}
      />
      <DropdownList
        title={TEST_DATA2.title}
        options={TEST_DATA2.options}
        onSelect={chassisSelectHandler}
      />
      <RangeSlider
        title={RANGE_DATA.title}
        defaultValue={RANGE_DATA.defaultValue}
        range={RANGE_DATA.range}
        onChange={yearRangeSelectHandler}
      />
      <CustomCheckbox label={'damaged'} onChange={damagedCheckHandler} />
      <Button text='Search' type='submit' />
    </form>
  )
}

export default Filter
