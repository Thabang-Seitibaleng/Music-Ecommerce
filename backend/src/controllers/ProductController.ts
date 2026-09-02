import { Request, Response, NextFunction } from 'express';
import Product from '../models/Product'; 

export class ProductController {
  static async getAllProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await Product.findAll({
        attributes: ['id', 'title', 'price', 'stockQuantity']
      });
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
}