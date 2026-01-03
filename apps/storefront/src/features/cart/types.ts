export interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  thumbnail: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;

  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (isOpen: boolean) => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}
