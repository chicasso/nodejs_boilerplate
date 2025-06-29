import { DateTime } from 'luxon';
import { HTTP_STATUS } from '../config/constants.js';

class ApiError extends Error {
  constructor({
    statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message = 'Unexpected Error Occurred!',
    details = null,
    data = null,
  } = {}) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;
    this.message = message;
    this.details = details;
    this.data = data;
    this.timestamp = DateTime.utc().toMillis();

    Error.captureStackTrace(this, this.constructor);
  }

  toErrorResponse() {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
      details: this.details,
      data: this.data,
    };
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        statusCode: this.statusCode,
        details: this.details,
        data: this.data,
      },
    };
  }
}

class ValidationError extends ApiError {
  constructor({ message = 'Validation Error!', details = 'VALIDATION_ERROR', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message,
      details,
      data,
    });
  }
}

class DBError extends ApiError {
  constructor({ message = 'Database Error!', details = 'DATABASE_ERROR', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message,
      details,
      data,
    });
  }
}

class NotFoundError extends ApiError {
  constructor({ message = 'Not Found!', details = 'NOT_FOUND', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.NOT_FOUND,
      message,
      details,
      data,
    });
  }
}

class RateLimitError extends ApiError {
  constructor({ message = 'Rate Limit Reached!', details = 'TOO_MANY_REQUESTS', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
      message,
      details,
      data,
    });
  }
}

class UnauthorizedError extends ApiError {
  constructor({ message = 'Unauthorized!', details = 'UNAUTHORIZED_ERROR', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.UNAUTHORIZED,
      message,
      details,
      data,
    });
  }
}

class ForbiddenError extends ApiError {
  constructor({ message = 'Forbidden!', details = 'FORBIDDEN_ERROR', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.FORBIDDEN,
      message,
      details,
      data,
    });
  }
}

class ConflictError extends ApiError {
  constructor({ message = 'Conflict!', details = 'CONFLICT_ERROR', data = null } = {}) {
    super({
      statusCode: HTTP_STATUS.CONFLICT,
      message,
      details,
      data,
    });
  }
}

class UserNotFoundError extends NotFoundError {
  constructor({ message = 'User Not Found!', details = 'USER_NOT_FOUND', data = null } = {}) {
    super({ message, details, data });
  }
}

class InternalServerError extends ApiError {
  constructor({
    message = 'Internal Server Error!',
    details = 'INTERNAL_SERVER_ERROR',
    data = null,
  } = {}) {
    super({
      statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message,
      details,
      data,
    });
  }
}

export {
  ApiError,
  RateLimitError,
  ValidationError,
  DBError,
  NotFoundError,
  InternalServerError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  UserNotFoundError,
};
