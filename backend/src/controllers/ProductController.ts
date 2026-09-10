import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Product from '../models/Product';
import { ProductQuerySchema } from '../schemas/ProductSchema';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const validatedQuery = ProductQuerySchema.parse(req.query);

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
    res.status(400).json({ message: 'Invalid search parameters' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    // Wrapped req.params.id in Number() to fix TypeScript mismatch
    const product = await Product.findByPk(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    // Wrapped req.params.id in Number() to fix TypeScript mismatch
    const product = await Product.findByPk(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    // Wrapped req.params.id in Number() to fix TypeScript mismatch
    const product = await Product.findByPk(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};