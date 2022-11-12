import DropdownList from 'components/UI/DropdownList/DropdownList'

const TEST_DATA = {
  options: ['Audi', 'BMW', 'Mercedes'],
  title: 'Brand',
}

const Filter = () => {
  const dropdownSelectHandler = (selected: string) => {
    console.log('in filter:', selected)
  }

  return (
    <form>
      <h3>What you're looking for?</h3>
      <DropdownList
        title={TEST_DATA.title}
        options={TEST_DATA.options}
        onSelect={dropdownSelectHandler}
      />
    </form>
  )
}

export default Filter
