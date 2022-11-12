import DropdownList from 'components/UI/DropdownList/DropdownList'

const TEST_DATA = {
  options: ['Audi', 'BMW', 'Mercedes'],
  title: 'Brand',
}

const TEST_DATA2 = {
  options: ['Sedan', 'Coupe'],
  title: 'Chassis Type',
}

const Filter = () => {
  const brandSelectHandler = (selected: string) => {
    console.log('in filter:', selected)
  }

  const chassisSelectHandler = (selected: string) => {
    console.log('in filter:', selected)
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
    </form>
  )
}

export default Filter
