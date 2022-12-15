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
  OrderByDirection,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Listing from '../../components/Listing/Listing';
import { getSearchQuery } from '../../utils/getSearchQuery';

const SORT_OPTIONS = [
  'Recently Added',
  'Oldest',
  'Price Ascending',
  'Price Descending',
  'Mileage Ascending',
  'Mileage Descending',
  'Production Year Ascending',
  'Production Year Descending',
];

const ResultsPage = () => {
  const [sortOption, setSortOption] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
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
    switch (selected) {
      case 'Recently Added':
        setSortOption('date');
        setSortDirection('desc');
        break;
      case 'Oldest':
        setSortOption('date');
        setSortDirection('asc');
        break;
      case 'Price Ascending':
        setSortOption('price');
        setSortDirection('asc');
        break;
      case 'Price Descending':
        setSortOption('price');
        setSortDirection('desc');
        break;
      case 'Mileage Ascending':
        setSortOption('mileage');
        setSortDirection('asc');
        break;
      case 'Mileage Descending':
        setSortOption('mileage');
        setSortDirection('desc');
        break;
      case 'Production Year Ascending':
        setSortOption('productionYear');
        setSortDirection('asc');
        break;
      case 'Production Year Descending':
        setSortOption('productionYear');
        setSortDirection('desc');
        break;
      default:
        setSortOption('date');
        setSortDirection('desc');
        break;
    }
  };

  useEffect(() => {
    const getListings = async () => {
      const listingsQuery = getSearchQuery(
        brand,
        drivetrain,
        isDamaged,
        isAccidentFree,
        sortOption,
        sortDirection as OrderByDirection | undefined
      );
      const listingsDocs = await getDocs(listingsQuery);

      setListings(listingsDocs.docs);
    };

    getListings();
  }, [router.query, sortOption, sortDirection]);

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
