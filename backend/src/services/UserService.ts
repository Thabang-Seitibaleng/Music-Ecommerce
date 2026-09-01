import { UserRepository } from '@repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  public static async register(data: { name: string; email: string; password: string }) {
    const existingUser = await UserRepository.findByEmail(data.email);
    if (existingUser) {
      throw { statusCode: 400, message: 'Email is already registered' };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'customer',
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  public static async login(data: { email: string; password: string }) {
    const user = await UserRepository.findByEmail(data.email);
    if (!user) {
      throw { statusCode: 401, message: "Invalid email or password" };
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: "Invalid email or password" };
    }

    const secret = process.env.JWT_SECRET || 'fallback_secret';
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secret,
      { expiresIn: "1d" },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}