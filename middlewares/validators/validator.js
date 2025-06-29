import { body, validationResult } from 'express-validator';
import { ValidationError } from '../../utils/apiError.js';
import { ERROR_MESSAGES, HTTP_STATUS } from '../../config/constants.js';

export const handleValidationErrors = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationErrors = errors.array().map((error) => ({
      message: error.msg,
    }));

    throw new ValidationError({
      message: validationErrors[0]?.message,
      details: ERROR_MESSAGES.INVALID_OPERATION,
      statusCode: HTTP_STATUS.BAD_REQUEST,
      data: null,
    });
  }
  next();
};

const commonValidations = {
  email: body('email')
    .isString()
    .withMessage('email must be a string')
    .trim()
    .notEmpty()
    .withMessage('email is required and cannot be empty'),

  password: body('password')
    .isString()
    .withMessage('password must be a string')
    .trim()
    .notEmpty()
    .withMessage('password is required and cannot be empty'),
};

export const loginValidator = [
  commonValidations.email,
  commonValidations.password,
  handleValidationErrors,
];
