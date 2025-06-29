export default class Logger {
  static log(error, req = null, level = 'error') {
    if (!['info', 'warn', 'error', 'debug'].includes(level)) {
      return;
    }

    const logData = {
      level,
      message: error.message,
      name: error.name,
      stack: error.stack,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
      ...(req && {
        url: req.originalUrl,
        method: req.method,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        userId: req.user?.id,
      }),
    };

    console[level](JSON.stringify(logData, null, 2));

    if (process.env.NODE_ENV === 'production') {
      /** todo */
    }
  }

  static info(message, data = {}) {
    this.log({ message, ...data }, null, 'info');
  }

  static warn(message, data = {}) {
    this.log({ message, ...data }, null, 'warn');
  }

  static error(message, data = {}) {
    this.log({ message, ...data }, null, 'error');
  }
}
