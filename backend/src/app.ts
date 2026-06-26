import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { errorMiddleware } from './middlewares/error.middleware';
import { loggingMiddleware } from './middlewares/logging.middleware';
import routes from './routes';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*' })); // Customize origin in production
app.disable('x-powered-by');

// Request Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Logging
app.use(morgan('combined'));
app.use(loggingMiddleware);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Routes
app.use('/api/v1', routes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

// Global Error Handler
app.use(errorMiddleware);

export default app;
