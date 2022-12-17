declare module '*module.css' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

interface Listing {
  uid: string;
  location: string;
  brand: string;
  date: number;
  model: string;
  productionYear: number;
  mileage: number;
  power: string;
  powertrain: string;
  gearbox: string;
  fuelType: string;
  description: string;
  price: number;
  isDamaged: boolean;
  isAccidentFree: boolean;
  storageRef: string;
  imageUrls: string[];
}
