export interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IJwtPayload {
  id: number;
  email: string;
  role: string;
}