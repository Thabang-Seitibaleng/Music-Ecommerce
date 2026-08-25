import { Request, Response, NextFunction } from 'express';
import { UserService } from '@services/UserService';

export class UserController {
  public static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.register(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await UserService.login(req.body);
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      return next(error);
    }
  }
}