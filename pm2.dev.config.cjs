module.exports = {
  apps: [
    {
      name: 'express-application',
      script: 'app.js',
      watch: false,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
