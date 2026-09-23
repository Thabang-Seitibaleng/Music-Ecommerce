import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { ProductQuerySchema } from '../schemas/ProductSchema';
import ProductRepository from '../repositories/ProductRepository'; // 👈 Import the repository

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

    const { count, rows } = await ProductRepository.findAllWithPagination(whereClause, limit, offset);

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
    // 👈 Call the repository
    const product = await ProductRepository.findById(Number(req.params.id));
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
    const product = await ProductRepository.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductRepository.update(Number(req.params.id), req.body);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const success = await ProductRepository.delete(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};