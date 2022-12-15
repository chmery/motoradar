import styles from './ResultsPage.module.scss';
import { useRouter } from 'next/router';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Filter from '../../components/Filter/Filter';
import DropdownList from '../../components/UI/DropdownList/DropdownList';
import React, { useEffect, useState } from 'react';
import {
  collection,
  CollectionReference,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Listing from '../../components/Listing/Listing';
import { getSearchQuery } from '../../utils/getSearchQuery';

const SORT_OPTIONS = [
  'Recently Added',
  'Price Ascending',
  'Price Descending',
  'Mileage Ascending',
  'Mileage Descending',
  'Production Year Ascending',
  'Production Year descending',
];

const ResultsPage = () => {
  const [sortOption, setSortOption] = useState('date');
  const [sortDirection, setSortDirection] = useState('asc');
  const [listings, setListings] = useState<QueryDocumentSnapshot<Listing>[]>();

  const router = useRouter();
  const {
    brand,
    drivetrain,
    isDamaged,
    isAccidentFree,
    yearFrom,
    yearTo,
    priceFrom,
    priceTo,
    mileageFrom,
    mileageTo,
  } = router.query;

  const handleSortOption = (selected: string) => {
    console.log(selected);
    setSortOption(selected);
  };

  useEffect(() => {
    const getListings = async () => {
      const listingsQuery = getSearchQuery(
        brand,
        drivetrain,
        isDamaged,
        isAccidentFree,
        sortOption,
        'desc'
      );
      const listingsDocs = await getDocs(listingsQuery);

      setListings(listingsDocs.docs);
    };

    getListings();
  }, [router.query]);

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.filters}>
          <div className={styles['sort-container']}>
            <h3 className={styles.header}>Sort</h3>
            <DropdownList
              placeholder={'Recently Added'}
              options={SORT_OPTIONS}
              onSelect={handleSortOption}
              dark={router.pathname === '/'}
            />
          </div>
          <Filter />
        </div>
        <div className={styles.listings}>
          <h3 className={styles.header}>{listings?.length} Results</h3>
          {listings?.map((listing) => {
            return (
              <Listing key={listing.id} data={listing.data()} id={listing.id} />
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};

export default ResultsPage;
