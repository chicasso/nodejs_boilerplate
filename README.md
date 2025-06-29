## Node.js Express Boilerplate

A production-ready, scalable Express.js boilerplate with modern development practices and essential features for building robust web applications and RESTful APIs.

## Features
- **Express.js Framework**
- **ES6+ Support**
- **Environment Configuration**
- **Middleware Integration** : Pre-configured essential middleware (CORS, body parsing, etc.)
- **Error Handling**
- **Security**
- **Development Tools**
- **Production Ready**
- **Clean Architecture**

## Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v20.0.0 or higher)
- **npm** (v8.0.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chicasso/nodejs_boilerplate.git
   cd nodejs_boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   ...
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The server will start at `http://localhost:3000`

## Project Structure

```
nodejs_boilerplate/
├── src/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Custom middleware
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── config/              # Configuration files
│   └── app.js               # Express app setup
├── public/                  # Static files
├── tests/                   # Test files
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── package.json            # Project dependencies
└── server.js               # Application entry point
```

## Available Scripts

- **`npm start`** - Start the production server
- **`npm run dev`** - Start development server with hot reload
- **`npm run format`** - Run prettier
- **`npm run lint`** - Run ESLint for code quality
- **`npm run lint:fix`** - Fix ESLint issues automatically

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v2.0 - see the [LICENSE](LICENSE) file for details.

## inks

- **Repository**: [https://github.com/chicasso/nodejs_boilerplate](https://github.com/chicasso/nodejs_boilerplate)
- **Issues**: [https://github.com/chicasso/nodejs_boilerplate/issues](https://github.com/chicasso/nodejs_boilerplate/issues)

**Happy Coding! 🎉**
