import {
  collection,
  CollectionReference,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const getSearchQuery = (
  brand: string,
  drivetrain: string,
  isDamaged: string,
  isAccidentFree: string,
  yearFrom: string,
  yearTo: string,
  priceFrom: string,
  priceTo: string,
  mileageFrom: string,
  mileageTo: string,
  sortOption: string,
  direction: string
) => {
  let listingsQuery = query(
    collection(db, 'listings') as CollectionReference<Listing>,
    orderBy(sortOption, 'desc')
  );
  if (brand && isAccidentFree) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('isAccidentFree', '==', isAccidentFree === 'true' ? true : false),
      orderBy(sortOption, 'desc')
    );
  }

  return listingsQuery;
};
