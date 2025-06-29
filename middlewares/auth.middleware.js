import Redis from '../config/redis.js';
import UserUtils from '../utils/user.js';
import { decrypt } from '../utils/encrypt.js';
import { UnauthorizedError } from '../utils/apiError.js';
import { constants, ERROR_MESSAGES } from '../config/constants.js';

export default class AuthMiddleware {
  static async authenticate(req, res, next) {
    try {
      const authHeader = req.headers?.authorization;

      if (!authHeader || !authHeader?.startsWith('Bearer ')) {
        throw new UnauthorizedError({
          message: ERROR_MESSAGES.AUTH.TOKEN_REQUIRED,
          details: ERROR_MESSAGES.AUTH.UNAUTHORIZED,
        });
      }

      const token = authHeader.split('Bearer ')[1];
      const decrToken = decrypt(token, constants.ENC_KEY, constants.ENC_IV);
      const decoded = UserUtils.authenticate(decrToken);

      const isTokenValid = await Redis.isUserTokenInCache(decoded.phoneNo, decoded.uuid);

      if (!isTokenValid) {
        throw new UnauthorizedError({ message: ERROR_MESSAGES.AUTH.UNAUTHORIZED });
      }

      req.user = decoded;
      next();
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.code === 'ERR_INVALID_ARG_VALUE') {
        next(new UnauthorizedError({ message: ERROR_MESSAGES.AUTH.INVALID_TOKEN }));
      } else {
        next(err);
      }
    }
  }
}
