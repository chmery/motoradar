import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ranges } from '../constants/constants';
import { db } from '../firebase/firebase';

export type DropdownData = {
  gearboxTypes: string[];
  drivetrainTypes: string[];
  fuelTypes: string[];
  productionYears: string[];
  brands: string[];
};

export const useDropdownData = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const { PRODUCTION_YEAR } = ranges;

  useEffect(() => {
    const fetchBrands = async () => {
      const fetchedBrands: string[] = [];
      const brandsQuery = await getDocs(collection(db, 'brands'));
      brandsQuery.forEach((doc) => {
        fetchedBrands.push(doc.data().name);
      });
      setBrands(fetchedBrands);
    };
    fetchBrands();
  }, []);

  const gearboxTypes = ['Automatic', 'Manual'];
  const drivetrainTypes = [
    'All-wheel drive',
    'Four-wheel drive',
    'Front-wheel drive',
    'Rear-wheel drive',
  ];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const productionYears: string[] = [];
  for (let i = PRODUCTION_YEAR.min; i <= PRODUCTION_YEAR.max; i++) {
    productionYears.push(i.toString());
  }

  return {
    gearboxTypes,
    drivetrainTypes,
    fuelTypes,
    productionYears,
    brands,
  };
};
