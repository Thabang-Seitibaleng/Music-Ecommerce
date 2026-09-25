import { Request, Response, NextFunction } from 'express';
import OrderRepository from '../repositories/OrderRepository';
import { AuthenticatedRequest } from '@middleware/auth';

export class OrderController {
  static async checkout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { validatedProducts } = req.body;
      const order = await OrderRepository.processCheckout(req.user!.id, validatedProducts);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  static async getUserOrders(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await OrderRepository.getUserOrders(req.user!.id);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}
