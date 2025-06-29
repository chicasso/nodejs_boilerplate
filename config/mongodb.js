import mongoose from 'mongoose';
import { constants, ERROR_MESSAGES } from './constants.js';
import { DBError } from '../utils/apiError.js';

export default class MongoDB {
  static connection = null;

  static async initialize() {
    try {
      const mongoURI = constants.MONGO_URI;

      if (!mongoURI) {
        throw new DBError({ message: 'MongoDB URI is required!' });
      }

      const options = {
        connectTimeoutMS: 5000,
        maxPoolSize: 10,
      };

      MongoDB.connection = await mongoose.connect(mongoURI, options);

      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error);
      });

      mongoose.connection.on('disconnected', (error) => {
        console.warn('MongoDB disconnected', error);
      });

      return MongoDB.testConnection();
    } catch (err) {
      console.error(`Database not connected ${err.message}`);
      throw new DBError({ message: ERROR_MESSAGES.DATABASE.CONNECTION_ERROR });
    }
  }

  static async testConnection() {
    const state = mongoose.connection.readyState;
    if (state === 1) {
      return true;
    }
    throw new DBError({ message: ERROR_MESSAGES.DATABASE.CONNECTION_ERROR });
  }

  static async disconnect() {
    if (MongoDB.connection) {
      try {
        await mongoose.disconnect();
      } catch (error) {
        console.info('MongoDB already disconnected');
      } finally {
        MongoDB.connection = null;
      }
    }
  }
}
