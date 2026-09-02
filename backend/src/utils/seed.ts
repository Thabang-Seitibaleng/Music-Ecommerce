import sequelize from '@config/database';
import { UserRepository } from '@repositories/UserRepository';
import Product from '../models/Product';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log('Starting database seeding...');

    const defaultPassword = 'Password123!';
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Seed Admin User
    const adminEmail = 'admin@test.com';
    const existingAdmin = await UserRepository.findByEmail(adminEmail);
    
    if (!existingAdmin) {
      await UserRepository.create({
        name: 'System Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`Admin account created: ${adminEmail}`);
    } else {
      console.log(`Admin account already exists: ${adminEmail}`);
    }

    // Seed Customer User
    const customerEmail = 'customer@test.com';
    const existingCustomer = await UserRepository.findByEmail(customerEmail);
    
    if (!existingCustomer) {
      await UserRepository.create({
        name: 'Test Customer',
        email: customerEmail,
        password: hashedPassword,
        role: 'customer',
      });
      console.log(`Customer account created: ${customerEmail}`);
    } else {
      console.log(`Customer account already exists: ${customerEmail}`);
    }

    // Seed Products Catalog
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.bulkCreate([
        { title: 'Wireless Mechanical Keyboard', price: 120.00, stockQuantity: 15 },
        { title: 'Ergonomic Gaming Mouse', price: 59.99, stockQuantity: 30 },
        { title: 'Ultra-Wide 27-inch Monitor', price: 349.99, stockQuantity: 8 }
      ]);
      console.log('Default products seeded successfully!');
    } else {
      console.log('Products already exist in the database.');
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
};

seedDatabase();