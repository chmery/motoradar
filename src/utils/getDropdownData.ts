import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export type dropdownData = {
  gearboxTypes: string[];
  drivetrainTypes: string[];
  fuelTypes: string[];
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
  const brands: string[] = [];

  const brandsQuery = await getDocs(collection(db, 'brands'));
  brandsQuery.forEach((doc) => {
    brands.push(doc.data().name);
  });

  return {
    gearboxTypes,
    drivetrainTypes,
    fuelTypes,
    brands,
  };
};
