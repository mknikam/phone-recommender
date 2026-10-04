export interface Phone {
  brand: string;
  name: string;
  price: number;
  priceBucket: number; // 1 to 6
  performance: number; // 1 to 10
  camera: number;
  battery: number;
  display: number;
  image: string;
}

export type Answers = {
  priceBucket: number;
  useCases: string[];
  brandPreference: string;
}
