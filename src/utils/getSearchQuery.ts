import {
  collection,
  CollectionReference,
  orderBy,
  OrderByDirection,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const getSearchQuery = <Type>(
  brand: Type,
  drivetrain: Type,
  isDamaged: Type,
  isAccidentFree: Type,
  sortOption: string,
  direction: OrderByDirection | undefined
) => {
  const accidentFree = isAccidentFree === 'true' ? true : false;
  const damaged = isDamaged === 'true' ? true : false;

  let listingsQuery = query(
    collection(db, 'listings') as CollectionReference<Listing>,
    orderBy(sortOption, direction)
  );

  if (brand && !drivetrain && !accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      orderBy(sortOption, direction)
    );
  } else if (brand && drivetrain && !accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('powertrain', '==', drivetrain),
      orderBy(sortOption, direction)
    );
  } else if (brand && drivetrain && accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('powertrain', '==', drivetrain),
      where('isAccidentFree', '==', accidentFree),
      orderBy(sortOption, direction)
    );
  } else if (brand && drivetrain && !accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('powertrain', '==', drivetrain),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (brand && drivetrain && accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('powertrain', '==', drivetrain),
      where('isAccidentFree', '==', accidentFree),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (brand && !drivetrain && accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('isAccidentFree', '==', accidentFree),
      orderBy(sortOption, direction)
    );
  } else if (brand && !drivetrain && accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('isAccidentFree', '==', accidentFree),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (brand && !drivetrain && !accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('brand', '==', brand),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (!brand && drivetrain && !accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('powertrain', '==', drivetrain),
      orderBy(sortOption, direction)
    );
  } else if (!brand && drivetrain && accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('powertrain', '==', drivetrain),
      where('isAccidentFree', '==', accidentFree),
      orderBy(sortOption, direction)
    );
  } else if (!brand && drivetrain && accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('powertrain', '==', drivetrain),
      where('isAccidentFree', '==', accidentFree),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (!brand && drivetrain && !accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('powertrain', '==', drivetrain),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (!brand && !drivetrain && accidentFree && !damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('isAccidentFree', '==', accidentFree),
      orderBy(sortOption, direction)
    );
  } else if (!brand && !drivetrain && accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('isAccidentFree', '==', accidentFree),
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  } else if (!brand && !drivetrain && !accidentFree && damaged) {
    listingsQuery = query(
      collection(db, 'listings') as CollectionReference<Listing>,
      where('isDamaged', '==', damaged),
      orderBy(sortOption, direction)
    );
  }

  return listingsQuery;
};
