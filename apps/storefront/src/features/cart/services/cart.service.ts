import axios from "axios";
import { CartItem } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export interface ValidateCartResponse {
  isValid: boolean;
  serverTotal: number;
  errors: string[];
}

export interface CheckoutResponse {
  url: string;
}

export const validateCart = async (
  items: CartItem[]
): Promise<ValidateCartResponse> => {
  try {
    const payload = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    }));

    const { data } = await axios.post<ValidateCartResponse>(
      `${API_URL}/api/validate-cart`,
      { items: payload }
    );
    return data;
  } catch (error) {
    console.error("Error validating cart:", error);
    throw error;
  }
};

export const createCheckoutSession = async (
  items: CartItem[]
): Promise<string> => {
  const payload = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  const { data } = await axios.post<CheckoutResponse>(
    `${API_URL}/api/create-checkout-session`,
    { items: payload }
  );

  return data.url;
};
