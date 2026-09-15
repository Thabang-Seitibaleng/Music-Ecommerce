import { request } from './api';
import type { AuthResponse, User } from '../types';

export const loginUser = (email: string, password: string) =>
  request<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const registerUser = (name: string, email: string, password: string) =>
  request<User>('/auth/register', { method: 'POST', body: JSON.stringify({ name, email, password }) });
