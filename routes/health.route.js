import { Router } from 'express';
import HealthCheckController from '../controllers/health.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const route = Router();

route.get('/check', AuthMiddleware.authenticate, HealthCheckController.healthCheck);

export default route;
