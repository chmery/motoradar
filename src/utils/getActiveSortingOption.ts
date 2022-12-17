export const getActiveSortingOption = (
  optionInDatabase: string,
  direction: string
) => {
  if (optionInDatabase === 'date' && direction === 'desc') {
    return 'Recently Added';
  }

  if (optionInDatabase === 'date' && direction === 'asc') {
    return 'Oldest';
  }

  if (optionInDatabase === 'price' && direction === 'asc') {
    return 'Price ↑';
  }

  if (optionInDatabase === 'price' && direction === 'desc') {
    return 'Price ↓';
  }

  if (optionInDatabase === 'mileage' && direction === 'asc') {
    return 'Mileage ↑';
  }

  if (optionInDatabase === 'mileage' && direction === 'desc') {
    return 'Mileage ↓';
  }

  if (optionInDatabase === 'productionYear' && direction === 'asc') {
    return 'Production Year ↑';
  }

  if (optionInDatabase === 'productionYear' && direction === 'desc') {
    return 'Production Year ↓';
  }
};
