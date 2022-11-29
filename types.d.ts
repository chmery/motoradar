declare module '*module.css' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}

interface Listing {
  uid: string;
  username: string;
  email: string;
  photoURL: string;
  brand: string;
  date: number;
  model: string;
  productionYear: string;
  mileage: string;
  power: string;
  powertrain: string;
  gearbox: string;
  fuelType: string;
  description: string;
  price: string;
  isDamaged: boolean;
  isAccidentFree: boolean;
  imageUrls: string[];
}
