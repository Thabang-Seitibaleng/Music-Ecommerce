import { request } from './api';
import type { AuthResponse, User } from '../types';

export const loginUser = (email: string, password: string) =>
  request<{ data: AuthResponse }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }).then(response => response.data);

export const registerUser = (name: string, email: string, password: string) =>
  request<{ data: User }>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) }).then(response => response.data);
