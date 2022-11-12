import DropdownList from 'components/UI/DropdownList/DropdownList'
import RangeSlider from 'components/UI/RangeSlider/RangeSlider'

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
  const brandSelectHandler = (selected: string) => {
    console.log('in filter:', selected)
  }

  const chassisSelectHandler = (selected: string) => {
    console.log('in filter:', selected)
  }

  const yearRangeSelectHandler = (range: number[]) => {
    console.log('in filter:', range)
  }

  return (
    <form>
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
    </form>
  )
}

export default Filter
