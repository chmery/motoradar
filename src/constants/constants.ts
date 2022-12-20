export const ranges = {
  PRICE: {
    min: 0,
    max: 1000000,
    range: [0, 1000000],
    midRange: [90000, 500000],
  },
  PRODUCTION_YEAR: {
    min: 1990,
    max: 2022,
    range: [1990, 2022],
    midRange: [2010, 2018],
  },
  MILEAGE: {
    min: 0,
    max: 1000000,
    range: [0, 1000000],
    midRange: [50000, 450000],
  },
  POWER: {
    max: 5000,
  },
};

export const initialNewListingState = {
  uid: '1111',
  location: '',
  brand: '',
  date: 1111,
  model: '',
  productionYear: 0,
  mileage: 0,
  power: '',
  powertrain: '',
  gearbox: '',
  fuelType: '',
  description: '',
  price: 0,
  isDamaged: false,
  isAccidentFree: false,
  imageUrls: [],
};
