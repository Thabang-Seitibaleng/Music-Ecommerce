import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '@utils/swagger';

extendZodWithOpenApi(z); // Inject .openapi() immediately

export const OrderResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  totalAmount: z.number(),
  status: z.string(),
}).openapi('Order');

// Register the Swagger UI path
registry.registerPath({
  method: 'post',
  path: '/api/orders/checkout',
  tags: ['Orders'],
description: 'Process a new order and create order items',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            userId: z.number(),
            totalAmount: z.number(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Order successfully created',
      content: {
        'application/json': {
          schema: OrderResponseSchema,
        },
      },
    },
  },
});