import Order from '../models/Order';
import OrderItem from '../models/OrderItem';

class OrderRepository {
  // We move the database logic for checkout directly in here
  async processCheckout(userId: number, totalAmount: number, validatedProducts: any[]) {
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

    return order;
  }
}

export default new OrderRepository();