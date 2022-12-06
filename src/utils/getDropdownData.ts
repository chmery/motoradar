import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export type dropdownData = {
  gearboxTypes: string[];
  drivetrainTypes: string[];
  fuelTypes: string[];
  productionYears: string[];
  brands: string[];
};

export const getDropdownData = async () => {
  const gearboxTypes = ['Automatic', 'Manual'];
  const drivetrainTypes = [
    'All-wheel drive',
    'Four-wheel drive',
    'Front-wheel drive',
    'Rear-wheel drive',
  ];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const productionYears: string[] = [];
  for (let i = 1990; i <= 2022; i++) {
    productionYears.push(i.toString());
  }
  const brands: string[] = [];

  const brandsQuery = await getDocs(collection(db, 'brands'));
  brandsQuery.forEach((doc) => {
    brands.push(doc.data().name);
  });

  return {
    gearboxTypes,
    drivetrainTypes,
    fuelTypes,
    productionYears,
    brands,
  };
};
