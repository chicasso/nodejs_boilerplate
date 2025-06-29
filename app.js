// Main dependencies
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
// Other dependencies
import {
  API_BASE_URL, ERROR_MESSAGES, RATE_LIMIT, constants,
} from './config/constants.js';
import { NotFoundError, RateLimitError } from './utils/apiError.js';
import errorHandler from './middlewares/error.middleware.js';
import Redis from './config/redis.js';
import MongoDB from './config/mongodb.js';
// Routes
import HealthRoute from './routes/health.route.js';

const { PORT } = constants;

const app = express();

const limiter = rateLimit({
  windowMs: RATE_LIMIT.WINDOW_MS,
  max: RATE_LIMIT.MAX_REQUESTS,
  handler: () => {
    throw new RateLimitError({
      message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
    });
  },
});

// MIDDLEWARES
app.use(bodyParser.json());
app.use(
  cors({
    origin: '*', /** REMOVE */
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: '*', /** REMOVE */
    credentials: true,
    preflightContinue: true,
  }),
);
app.use(limiter);

// ROUTES
app.use(`${API_BASE_URL}/health`, HealthRoute);

// 404 Not found
app.use('*', (req, _res, next) => {
  const error = new NotFoundError(`Route ${req.originalUrl} not found`);
  next(error);
});

// ERROR ROUTE
app.use(errorHandler);

process.on('SIGINT', async () => {
  try {
    console.info('Server is shutting down ...');
    await Promise.all([MongoDB.disconnect(), Redis.disconnect()]);
    console.info('All database connections closed.');
    process.exitCode = 0;
  } catch (err) {
    console.error('Error during shutdown:', err);
    process.exitCode = 1;
  } finally {
    process.exit(process.exitCode);
  }
});

Promise.all([MongoDB.initialize(), Redis.initialize()])
  .then(() => {
    console.info('All database connected');
    app.listen(PORT, () => {
      console.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize:', error);
    process.exitCode = 1;
  });

export default app;
