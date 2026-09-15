import { Request, Response, NextFunction } from 'express';
import OrderRepository from '../repositories/OrderRepository';

export class OrderController {
  static async checkout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, totalAmount, validatedProducts } = req.body;

  
      const order = await OrderRepository.processCheckout(userId, totalAmount, validatedProducts);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
}