export interface Product {
  id: number;
  name: string;
  artist: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}
