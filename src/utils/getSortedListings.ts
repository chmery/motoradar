import { QueryDocumentSnapshot } from 'firebase/firestore';

export const getSortedListings = (
  yearFrom: string,
  yearTo: string,
  priceFrom: string,
  priceTo: string,
  mileageFrom: string,
  mileageTo: string,
  listings: QueryDocumentSnapshot<Listing>[]
) => {
  if (!yearFrom) {
    return listings;
  }

  const sortedListings = listings.filter((listing) => {
    const { productionYear, mileage, price } = listing.data();
    if (
      productionYear >= +yearFrom &&
      productionYear <= +yearTo &&
      price >= +priceFrom &&
      price <= +priceTo &&
      mileage >= +mileageFrom &&
      mileage <= +mileageTo
    ) {
      return listing;
    }
  });

  return sortedListings;
};
