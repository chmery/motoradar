import styles from './ResultsPage.module.scss';
import { useRouter } from 'next/router';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Filter from '../../components/Filter/Filter';
import DropdownList from '../../components/UI/DropdownList/DropdownList';
import React, { useEffect, useState } from 'react';
import {
  getDocs,
  OrderByDirection,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import Listing from '../../components/Listing/Listing';
import { getSearchQuery } from '../../utils/getSearchQuery';
import { getSortedListings } from '../../utils/getSortedListings';

import { TbArrowsSort } from 'react-icons/tb';
import { IoOptionsOutline } from 'react-icons/io5';
import ListingLoader from '../../components/UI/Loaders/ListingLoader/ListingLoader';
import FilterMenu from '../../components/Results/FilterMenu/FilterMenu';
import SortMenu from '../../components/Results/SortMenu/SortMenu';
import Head from 'next/head';

const SORT_OPTIONS = [
  'Recently Added',
  'Oldest',
  'Price ↑',
  'Price ↓',
  'Mileage ↑',
  'Mileage ↓',
  'Production Year ↑',
  'Production Year ↓',
];

const ResultsPage = () => {
  const [sortOption, setSortOption] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [listings, setListings] =
    useState<(QueryDocumentSnapshot<Listing> | undefined)[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

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
      case 'Price ↑':
        setSortOption('price');
        setSortDirection('asc');
        break;
      case 'Price ↓':
        setSortOption('price');
        setSortDirection('desc');
        break;
      case 'Mileage ↑':
        setSortOption('mileage');
        setSortDirection('asc');
        break;
      case 'Mileage ↓':
        setSortOption('mileage');
        setSortDirection('desc');
        break;
      case 'Production Year ↑':
        setSortOption('productionYear');
        setSortDirection('asc');
        break;
      case 'Production Year ↓':
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
      setIsLoading(true);
      const listingsQuery = getSearchQuery(
        brand as string,
        drivetrain as string,
        isDamaged as string,
        isAccidentFree as string,
        sortOption,
        sortDirection as OrderByDirection | undefined
      );
      const listingsDocs = await getDocs(listingsQuery);

      const sortedListings = getSortedListings(
        yearFrom as string,
        yearTo as string,
        priceFrom as string,
        priceTo as string,
        mileageFrom as string,
        mileageTo as string,
        listingsDocs.docs
      );

      setListings(sortedListings);
      setIsLoading(false);
    };

    getListings();
  }, [
    router.query,
    sortOption,
    sortDirection,
    brand,
    drivetrain,
    isAccidentFree,
    isDamaged,
    mileageFrom,
    mileageTo,
    priceFrom,
    priceTo,
    yearFrom,
    yearTo,
  ]);

  const handleFilterClose = () => {
    setIsFilterOpen(false);
  };

  const handleSortClose = () => {
    setIsSortOpen(false);
  };

  return (
    <>
      <Head>
        <title>Motoradar - Results</title>
        <link rel='icon' href='/favicon.png' />
        <meta
          name='description'
          content='Car marketplace allowing people to list or search for new or used cars.'
        />
        <meta
          name='keywords'
          content='car marketplace, car, cars, new car, new cars, demaged car, find car, car finder, motoradar'
        />
        <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
      </Head>
      {isFilterOpen && <FilterMenu closeMenu={handleFilterClose} />}
      {isSortOpen && (
        <SortMenu
          closeMenu={handleSortClose}
          options={SORT_OPTIONS}
          handleSortOptions={handleSortOption}
          sortOption={sortOption}
          sortDirection={sortDirection}
        />
      )}
      <Wrapper>
        <div className={styles.container}>
          <div className={styles.filters}>
            <div className={styles['sort-container']}>
              <h3 className={styles.header}>Sort By</h3>
              <DropdownList
                placeholder={'Recently Added'}
                options={SORT_OPTIONS}
                onSelect={(selected) => handleSortOption(selected as string)}
                dark={router.pathname === '/'}
              />
            </div>
            <Filter />
          </div>
          <div className={styles.listings}>
            <header className={styles['header-container']}>
              <button
                className={styles.menu}
                onClick={() => setIsFilterOpen(true)}
              >
                <IoOptionsOutline />
                <span>Filter</span>
              </button>
              <h3 className={styles['results-header']}>
                {listings?.length} Results
              </h3>
              <button
                className={styles.menu}
                onClick={() => setIsSortOpen(true)}
              >
                <TbArrowsSort /> <span>Sort</span>
              </button>
            </header>

            {isLoading && (
              <>
                <ListingLoader />
                <ListingLoader />
                <ListingLoader />
                <ListingLoader />
                <ListingLoader />
              </>
            )}
            {!isLoading &&
              listings?.map((listing) => {
                if (!listing) return;
                return (
                  <Listing
                    key={listing.id}
                    data={listing.data()}
                    id={listing.id}
                  />
                );
              })}
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default ResultsPage;
