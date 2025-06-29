import jwt from 'jsonwebtoken';
import { constants, ERROR_MESSAGES } from '../config/constants.js';
import { UnauthorizedError, ValidationError } from './apiError.js';

export default class UserUtils {
  static authenticate(token) {
    if (!token) {
      throw new UnauthorizedError({
        message: 'Token is required!',
        details: ERROR_MESSAGES.AUTH.TOKEN_REQUIRED,
      });
    }
    const decoded = jwt.verify(token, constants.ACCESS_TOKEN_SECRET, {
      ignoreExpiration: false,
    });

    return decoded;
  }

  /**
   * user = { phoneNo, role, email, _id }
   */
  static generateAccessToken({
    phoneNo, role, _id, uuid,
  }) {
    if (!phoneNo || !role || !_id || !uuid) {
      throw new ValidationError({
        message: ERROR_MESSAGES.INVALID_OPERATION,
      });
    }

    return jwt.sign(
      {
        _id, phoneNo, role, uuid,
      },
      constants.ACCESS_TOKEN_SECRET,
      {
        expiresIn: constants.ACCESS_TOKEN_EXPIRY,
      },
    );
  }

  /**
   * user = { phoneNo, role, email, _id }
   */
  static generateRefreshToken(user) {
    if (!user) {
      throw new ValidationError({
        message: ERROR_MESSAGES.INVALID_OPERATION,
      });
    }

    return jwt.sign({ id: user._id }, constants.REFRESH_TOKEN_SECRET, {
      expiresIn: constants.REFRESH_TOKEN_EXPIRY,
    });
  }
}
