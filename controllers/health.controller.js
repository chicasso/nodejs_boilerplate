import { HTTP_STATUS } from '../config/constants.js';

export default class HealthCheckController {
  static async healthCheck(req, res, next) {
    const response = {
      statusCode: null,
      success: false,
      message: null,
      error: null,
      data: null,
    };

    try {
      const { user } = req;

      response.success = true;
      response.message = `${user ? 'Success' : 'Unauthorised Access'}, Health is OK`;
      response.statusCode = HTTP_STATUS.OK;

      res.status(HTTP_STATUS.OK).json(response);
    } catch (err) {
      console.error(`Error inside ${req.originalUrl}`, err);
      next(err);
    }
  }
}
