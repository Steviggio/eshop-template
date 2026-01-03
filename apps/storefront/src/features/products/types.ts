export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  thumbnail: string;
  images: string[];
  stock: number;
  tags?: string[];
}
