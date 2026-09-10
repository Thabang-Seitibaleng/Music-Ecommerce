import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/Product';
import { z } from 'zod';

const ProductQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
});

export const getProducts = async (req: Request, res: Response) => {
  try {
    // 2. Run the incoming URL parameters through our Zod validation
    const validatedQuery = ProductQuerySchema.parse(req.query);

    // 3. Use the safe, validated data instead of raw req.query
    const page = validatedQuery.page || 1;
    const limit = validatedQuery.limit || 10;
    const offset = (page - 1) * limit;

    const whereClause: any = {};

    if (validatedQuery.category) {
      whereClause.category = validatedQuery.category;
    }

    if (validatedQuery.minPrice || validatedQuery.maxPrice) {
      whereClause.price = {};
      if (validatedQuery.minPrice) whereClause.price[Op.gte] = validatedQuery.minPrice;
      if (validatedQuery.maxPrice) whereClause.price[Op.lte] = validatedQuery.maxPrice;
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });

    res.status(200).json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      products: rows,
    });
  } catch (error) {
    // If Zod validation fails, it throws an error that we catch here
    res.status(400).json({ message: 'Invalid search parameters' });
  }
};