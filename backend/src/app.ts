import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { generateOpenApiDocumentation } from '@utils/swagger';
import userRoutes from "@routes/UserRoutes";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  private configureMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(hpp());
    this.app.use(morgan('dev'));
  }

  private configureRoutes(): void {
    // Health check endpoint
    this.app.get('/api/health', (req: Request, res: Response) => {
      res.status(200).json({ status: 'success', message: 'SEN371 E-Commerce API is running smoothly' });
    });

    // Mount interactive Swagger UI documentation at /docs
    const swaggerDocument = generateOpenApiDocumentation();
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    this.app.use("/api/auth", userRoutes);
  }

  private configureErrorHandling(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.error('Global Error Catch:', err);
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
      });
    });
  }
}

export default new App().app;