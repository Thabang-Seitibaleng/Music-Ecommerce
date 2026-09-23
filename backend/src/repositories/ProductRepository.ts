import Product from '../models/Product';

class ProductRepository {
  async findAllWithPagination(whereClause: any, limit: number, offset: number) {
    return await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
    });
  }

  async findById(id: number) {
    return await Product.findByPk(id);
  }

  async create(data: any) {
    return await Product.create(data);
  }

  async update(id: number, data: any) {
    const product = await this.findById(id);
    if (!product) return null;
    return await product.update(data);
  }

  async delete(id: number) {
    const product = await this.findById(id);
    if (!product) return null;
    await product.destroy();
    return true;
  }
}

export default new ProductRepository();