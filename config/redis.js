import IORedis from 'ioredis';
import { DateTime } from 'luxon';
import interpolate from '../utils/interpolate.js';
import { DBError, ValidationError } from '../utils/apiError.js';
import { ERROR_MESSAGES, USER_VALID_TOKEN_KEY, constants } from './constants.js';

export default class Redis {
  static client = null;

  static async initialize() {
    try {
      IORedis.client = new IORedis({
        host: constants.REDIS_HOST,
        port: constants.REDIS_PORT,
        password: constants.REDIS_PASSWORD,
        ssl: true,
        tls: {},
        retryStrategy: (times) => Math.min(times * 50, 2000),
      });

      IORedis.client.on('error', (error) => {
        console.error('Redis Client Error:', error);
      });

      return IORedis.client;
    } catch (error) {
      throw new DBError({ message: ERROR_MESSAGES.REDIS.CONNECTION_ERROR });
    }
  }

  static async disconnect() {
    if (IORedis.client) {
      try {
        if (IORedis.client.status === 'ready') {
          console.warn('Redis disconnected');
          IORedis.client.quit();
        }
      } catch (error) {
        console.warn('Redis already disconnected');
      } finally {
        IORedis.client = null;
      }
    }
  }

  static async set(key, value, expirySeconds = 3600 /* 1 hour */) {
    try {
      await IORedis.client.set(key, value, 'EX', expirySeconds);
    } catch (error) {
      throw new DBError({ message: ERROR_MESSAGES.REDIS.OPERATION_ERROR });
    }
  }

  static async get(key) {
    try {
      return await IORedis.client.get(key);
    } catch (error) {
      throw new DBError({ message: ERROR_MESSAGES.REDIS.OPERATION_ERROR });
    }
  }

  static async delete(key) {
    try {
      await IORedis.client.del(key);
    } catch (error) {
      throw new DBError({ message: ERROR_MESSAGES.REDIS.OPERATION_ERROR });
    }
  }

  static async addUserToken(email, uniqueTokenID) {
    if (!email || !uniqueTokenID) {
      throw new ValidationError({ message: 'email and uniqueTokenID are required!' });
    }

    const key = interpolate(USER_VALID_TOKEN_KEY, { email });
    const now = DateTime.utc().toMillis();

    const luaScript = `
      redis.call('zadd', KEYS[1], ARGV[1], ARGV[2])
      redis.call('zremrangebyrank', KEYS[1], 0, -4)
      return 1
    `;

    return IORedis.client.eval(luaScript, 1, key, now, uniqueTokenID);
  }

  static async getUserTokens(email) {
    if (!email) {
      throw new ValidationError({ message: 'email is required!' });
    }
    const key = interpolate(USER_VALID_TOKEN_KEY, { email });
    return IORedis.client.zrevrange(key, 0, 2);
  }

  static async isUserTokenInCache(email, uniqueTokenID) {
    if (!email || !uniqueTokenID) {
      throw new ValidationError({ message: 'email and uniqueTokenID are required!' });
    }

    const key = interpolate(USER_VALID_TOKEN_KEY, { email });

    const result = await IORedis.client.zrank(key, uniqueTokenID);
    return result !== null;
  }

  static async setOtpUsageData(key) {
    if (!key) {
      throw new ValidationError({ message: ERROR_MESSAGES.INVALID_OPERATION });
    }

    const keyValue = await Redis.get(key);
    const now = DateTime.utc().toMillis();

    let count = 1;
    let timestamp = now;

    const otpResendDelay = 30000;
    const otpBanDelay = 300000;

    if (keyValue) {
      const parsed = JSON.parse(keyValue);
      const lastTime = +parsed.timestamp;
      const timeDiff = now - lastTime;

      if (timeDiff < otpResendDelay && parsed.count >= 3) { /** 30 sec and 3 otps */
        const retryAfter = Math.ceil((otpResendDelay - timeDiff) / 1000);
        return {
          error: true,
          message: 'You have exceeded limit for OTP attempts.',
          data: retryAfter,
          details: 'You have exhausted all of your OTP requests!',
        };
      }

      if (timeDiff < otpBanDelay) { /** 5 mins */
        const retryAfter = Math.ceil((otpBanDelay - timeDiff) / 1000);
        return {
          error: true,
          message: 'You have exceeded limit for OTP attempts.',
          data: retryAfter,
          details: 'You must wait before requesting another OTP.',
        };
      }

      if (timeDiff >= otpBanDelay) {
        count = 1;
        timestamp = now;
      } else {
        count = parsed.count + 1;
        timestamp = now;
      }
    }

    await Redis.set(key, JSON.stringify({ count, timestamp }), otpBanDelay);

    return {
      error: false,
      message: 'OTP sent',
      data: { count },
      details: null,
    };
  }
}
