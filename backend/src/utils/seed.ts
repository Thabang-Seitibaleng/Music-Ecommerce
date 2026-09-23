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
        { title: 'After the Static', artist: 'The Lanterns', description: 'A restless alternative record with wide guitars and quiet moments.', category: 'Alternative', price: 29.99, stockQuantity: 12 },
        { title: 'Side Streets', artist: 'Mara Vale', description: 'Warm indie pop for late drives and long conversations.', category: 'Indie', price: 27.00, stockQuantity: 18 },
        { title: 'Electric Bloom', artist: 'NOVA', description: 'A sharp, modern pop pressing with a bright pulse.', category: 'Pop', price: 31.00, stockQuantity: 8 },
        { title: 'Blue Hour', artist: 'The Coastline', description: 'Melodic rock with a sun-faded, analogue edge.', category: 'Rock', price: 26.50, stockQuantity: 25 },
        { title: 'Sunday Session', artist: 'The Velvet Room', description: 'A timeless soul and jazz compilation on heavyweight vinyl.', category: 'Classics', price: 34.00, stockQuantity: 5 },
        { title: 'Orbit One', artist: 'REC. Audio', description: 'A clean belt-drive turntable made for uncomplicated listening.', category: 'Turntables', price: 249.00, stockQuantity: 10 },
        { title: 'Soft Landing', artist: 'June & The Satellites', description: 'Hushed indie guitars and warm harmonies for the hours when the world slows down.', category: 'Indie', price: 28.00, stockQuantity: 14 },
        { title: 'Night Windows', artist: 'Low Signal', description: 'An alternative record of steady basslines, spacious drums, and city-after-dark textures.', category: 'Alternative', price: 30.00, stockQuantity: 9 },
        { title: 'Golden Days', artist: 'The Daydream Club', description: 'Bright pop melodies, easy rhythms, and a little sunshine for your record shelf.', category: 'Pop', price: 27.50, stockQuantity: 16 }
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
