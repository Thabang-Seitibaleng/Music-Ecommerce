import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '@utils/swagger';

extendZodWithOpenApi(z); 

export const ProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
}).openapi('Product');

// Strict validation logic split into its proper architectural layer
export const ProductQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  category: z.string().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
});

export const PaginatedProductResponseSchema = z.object({
  totalItems: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  products: z.array(ProductResponseSchema),
}).openapi('PaginatedProducts');

registry.register('Product', ProductResponseSchema);
registry.register('PaginatedProducts', PaginatedProductResponseSchema);

registry.registerPath({
  method: 'get',
  path: '/api/products',
  tags: ['Products'],
  description: 'Retrieves the catalog from the products table with optional filtering and pagination',
  request: {
    query: ProductQuerySchema, 
  },
  responses: {
    200: {
      description: 'Successful paginated response',
      content: {
        'application/json': {
          schema: PaginatedProductResponseSchema, 
        },
      },
    },
  },
});