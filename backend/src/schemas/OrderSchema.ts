import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { registry } from '@utils/swagger';

extendZodWithOpenApi(z); 

export const OrderResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  totalAmount: z.number(),
  status: z.string(),
}).openapi('Order');

registry.register('Order', OrderResponseSchema);

const ValidatedProductSchema = z.object({
  quantity: z.coerce.number().int().positive(),
  product: z.object({
    id: z.coerce.number().int().positive(),
  }),
});

export const CheckoutSchema = z.object({
  body: z.object({
    validatedProducts: z.array(ValidatedProductSchema).min(1),
  }),
});

registry.registerPath({
  method: 'post',
  path: '/api/orders/checkout',
  tags: ['Orders'],
  description: 'Process a new order and create order items',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            validatedProducts: z.array(ValidatedProductSchema),
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
