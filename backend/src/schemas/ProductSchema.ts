import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'; // 1. Add this import
import { registry } from '@utils/swagger';

extendZodWithOpenApi(z); // 2. Call this immediately to inject .openapi() into Zod

export const ProductResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  stockQuantity: z.number(),
}).openapi('Product');

registry.register('Product', ProductResponseSchema);

registry.registerPath({
  method: 'get',
  path: '/api/products',
  tags: ['Products'],
  description: 'Retrieves the catalog from the products table',
  responses: {
    200: {
      description: 'Successful response',
      content: {
        'application/json': {
          schema: z.array(ProductResponseSchema),
        },
      },
    },
  },
});