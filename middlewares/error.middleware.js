import { DateTime } from 'luxon';
import { HTTP_STATUS } from '../config/constants.js';

const errorHandler = (error, _req, res, _next) => {
  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    data: null,
    success: false,
    message: error.message || 'Internal server error',
    error: {
      message: error.message || 'Internal server error',
      statusCode: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
      timestamp: DateTime.utc().toMillis(),
      data: error.data,
    },
    statusCode: error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
    details: error.details || null,
  });
};

export default errorHandler;
