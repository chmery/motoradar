import styles from './ResultsPage.module.scss';
import { useRouter } from 'next/router';
import Wrapper from '../../components/UI/Wrapper/Wrapper';
import Filter from '../../components/Filter/Filter';
import DropdownList from '../../components/UI/DropdownList/DropdownList';
import { useState } from 'react';

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

  const router = useRouter();

  const handleSortOption = (selected: string) => {
    setSortOption(selected);
  };

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
        <div className={styles.listings}>aha</div>
      </div>
    </Wrapper>
  );
};

export default ResultsPage;
