import type { CartItem } from "../types";
import { request } from "./api";

type OrderResponse = {
  id: number;
  userId: number;
  totalAmount: number | string;
  status: string;
};

// Converts the local cart into the small checkout payload expected by the Order API.
export function checkout(items: CartItem[]) {
  const token = localStorage.getItem("sen371-token");
  if (!token) throw new Error("Please sign in before placing an order.");
  return request<OrderResponse>("/orders/checkout", {
    method: "POST",
    // The backend verifies this token before it accepts a checkout request.
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      validatedProducts: items.map((item) => ({
        quantity: item.quantity,
        product: { id: item.id },
      })),
    }),
  });
}
