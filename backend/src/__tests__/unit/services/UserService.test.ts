import { UserService } from '@services/UserService';
import { UserRepository } from '@repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('@repositories/UserRepository');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('UserService Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    const registerData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'Password123!',
    };

    it('should register a new user successfully', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'customer',
      };

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (UserRepository.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await UserService.register(registerData);

      expect(UserRepository.findByEmail).toHaveBeenCalledWith(
        registerData.email,
      );

      expect(bcrypt.hash).toHaveBeenCalledWith(
        registerData.password,
        10,
      );

      expect(UserRepository.create).toHaveBeenCalledWith({
        name: registerData.name,
        email: registerData.email,
        password: 'hashedPassword',
        role: 'customer',
      });

      expect(result).toEqual({
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        role: 'customer',
      });
    });

    it('should throw an error if the email is already registered', async () => {
      const existingUser = {
        id: 1,
        name: 'Existing User',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: 'customer',
      };

      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(
        existingUser,
      );

      await expect(
        UserService.register(registerData),
      ).rejects.toEqual({
        statusCode: 400,
        message: 'Email is already registered',
      });

      expect(UserRepository.create).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'Password123!',
    };

    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'customer',
    };

    it('should login successfully and return a JWT token', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(
        mockUser,
      );

      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      (jwt.sign as jest.Mock).mockReturnValue('mock-jwt-token');

      process.env.JWT_SECRET = 'test-secret';

      const result = await UserService.login(loginData);

      expect(UserRepository.findByEmail).toHaveBeenCalledWith(
        loginData.email,
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginData.password,
        mockUser.password,
      );

      expect(jwt.sign).toHaveBeenCalledWith(
        {
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
        },
        'test-secret',
        {
          expiresIn: '1d',
        },
      );

      expect(result).toEqual({
        token: 'mock-jwt-token',
        user: {
          id: 1,
          name: 'Test User',
          email: 'test@example.com',
          role: 'customer',
        },
      });
    });

    it('should throw an error if the user does not exist', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        UserService.login(loginData),
      ).rejects.toEqual({
        statusCode: 401,
        message: 'Invalid email or password',
      });

      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it('should throw an error if the password is incorrect', async () => {
      (UserRepository.findByEmail as jest.Mock).mockResolvedValue(
        mockUser,
      );

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        UserService.login(loginData),
      ).rejects.toEqual({
        statusCode: 401,
        message: 'Invalid email or password',
      });

      expect(bcrypt.compare).toHaveBeenCalledWith(
        loginData.password,
        mockUser.password,
      );

      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});