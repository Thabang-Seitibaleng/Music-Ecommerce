import User from '@models/User';
import { IUser } from '@interfaces/user.types';

export class UserRepository {
  public static async findByEmail(email: string): Promise<User | null> {
    return User.findOne({ where: { email } });
  }

  public static async create(userData: Partial<IUser>): Promise<User> {
    return User.create(userData as any);
  }

  public static async findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }
}