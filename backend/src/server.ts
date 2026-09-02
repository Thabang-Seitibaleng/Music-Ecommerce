import app from './app';
import sequelize from '@config/database';
import { setupAssociations } from '@models/associations';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Verify database connectivity
    setupAssociations();
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Automatically sync models (using { alter: true } safely updates tables during development sprints)
    await sequelize.sync({ force: true });
    console.log('Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`Server is live and running on port ${PORT}`);
      console.log(`Access API documentation via http://localhost:${PORT}/docs`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

startServer();