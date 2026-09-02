import { Request, Response, NextFunction } from 'express';
import Order from '../models/Order';
import OrderItem from '../models/OrderItem';

export class OrderController {
  static async checkout(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { userId, totalAmount, validatedProducts } = req.body;

      const order = await Order.create({
        userId,
        totalAmount,
        status: 'pending' 
      });

      for (const entry of validatedProducts || []) {
        await OrderItem.create({
          orderId: order.id,
          productId: entry.product.id,
          quantity: entry.quantity,
          unitPrice: entry.product.price 
        });
      }

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
}