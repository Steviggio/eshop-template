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
  category: string;
  tags: string[];
}

export interface ProductListResponse {
  products: Product[];
  total: number;
}
