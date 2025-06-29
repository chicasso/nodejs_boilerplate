import dotenv from 'dotenv';

dotenv.config({});

export const constants = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  ENC_KEY: process.env.ENC_KEY,
  ENC_IV: process.env.ENC_IV,
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  PRE_CONDITION_FAILED: 412,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const ERROR_MESSAGES = {
  INVALID_OPERATION: 'Invalid operation!',
  INTERNAL_SERVER_ERROR: 'Internal server error!',
  DATABASE: {
    CONNECTION_ERROR: 'Database connection error',
  },
  AUTH: {
    UNAUTHORIZED: 'Unauthorized access',
    INVALID_TOKEN: 'Invalid or expired token',
    TOKEN_REQUIRED: 'Authentication token is required',
  },
  REDIS: {
    OPERATION_ERROR: 'Redis operation error',
    CONNECTION_ERROR: 'Redis connection error',
  },
  RATE_LIMIT_EXCEEDED: 'Too many requests, API rate limit reached, please try again later!',
  NOT_FOUND: '404, Not Found!',
};

// 15 requests per minute
export const RATE_LIMIT = {
  WINDOW_MS: 60 * 1000, // 1 Min
  MAX_REQUESTS: 15, // 15 Reqs
};

export const ROLES = {
  UserRole: 'user',
};

export const USER_VALID_TOKEN_KEY = '{{email}}#user_token';

export const ALGORITHM = 'aes-256-cbc';

export const OTP_KEY_REDIS = '{{email}}#recent_otp_data';

export const OTP_BAN_KEY_REDIS = '{{key}}#banned';

export const API_BASE_URL = '/api/v1';
