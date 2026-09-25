import Order from '../models/Order';
import OrderItem from '../models/OrderItem';
import Product from '../models/Product';
import sequelize from '@config/database';

class OrderRepository {
  async processCheckout(userId: number, validatedProducts: Array<{ quantity: number; product: { id: number } }>) {
    const transaction = await sequelize.transaction();

    try {
      const items: Array<{ productId: number; quantity: number; unitPrice: number }> = [];
      let totalAmount = 0;

      for (const entry of validatedProducts) {
        const product = await Product.findByPk(entry.product.id, { transaction, lock: transaction.LOCK.UPDATE });
        if (!product) throw { statusCode: 400, message: `Product ${entry.product.id} was not found` };
        if (product.stockQuantity < entry.quantity) throw { statusCode: 400, message: `${product.title} does not have enough stock` };

        const unitPrice = Number(product.price);
        totalAmount += unitPrice * entry.quantity;
        product.stockQuantity -= entry.quantity;
        await product.save({ transaction });
        items.push({ productId: product.id, quantity: entry.quantity, unitPrice });
      }

      const order = await Order.create({ userId, totalAmount, status: 'pending' }, { transaction });
      await OrderItem.bulkCreate(items.map(item => ({ orderId: order.id, ...item })), { transaction });
      await transaction.commit();
      return order;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUserOrders(userId: number) {
    return await Order.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });
  }
}

export default new OrderRepository();
