import type { CartItem } from '../types';
import { request } from './api';

type OrderResponse = { id: number; userId: number; totalAmount: number | string; status: string };

export function checkout(items: CartItem[]) {
  const token = localStorage.getItem('sen371-token');
  if (!token) throw new Error('Please sign in before placing an order.');
  return request<OrderResponse>('/orders/checkout', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ validatedProducts: items.map(item => ({ quantity: item.quantity, product: { id: item.id } })) }),
  });
}
