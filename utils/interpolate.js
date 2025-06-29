import { ERROR_MESSAGES } from '../config/constants.js';
import { ValidationError } from './apiError.js';

export default function interpolate(placeholder, payload) {
  if (!placeholder || typeof placeholder !== 'string') {
    throw new ValidationError({
      message: 'Placeholder must be a string',
      details: ERROR_MESSAGES.INVALID_OPERATION,
    });
  }

  if (!payload || typeof payload !== 'object') {
    throw new ValidationError({
      message: 'Payload must be a valid object',
      details: ERROR_MESSAGES.INVALID_OPERATION,
    });
  }

  return placeholder.replace(/\{\{(\w+)\}\}/g, (match, key) => (payload[key] !== undefined ? payload[key] : match));
}
