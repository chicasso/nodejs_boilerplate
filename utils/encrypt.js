import crypto from 'crypto';
import { ALGORITHM } from '../config/constants.js';

export function encrypt(payload, KEY, IV) {
  let stringifiedPayload = payload;

  if (typeof payload === 'object') {
    stringifiedPayload = JSON.stringify(payload);
  }

  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY, 'hex'), Buffer.from(IV, 'hex'));

  let encrypted = cipher.update(stringifiedPayload, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encryptedData: encrypted,
    iv: IV.toString('hex'),
    key: KEY.toString('hex'),
  };
}

export function decrypt(encryptedHexPayload, keyHex, ivHex) {
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(keyHex, 'hex'),
    Buffer.from(ivHex, 'hex'),
  );

  let decrypted = decipher.update(encryptedHexPayload, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  try {
    decrypted = JSON.parse(decrypted);
    return decrypted;
  } catch (err) {
    console.error('Payload was not a valid json, returing it as it is!');
    return decrypted;
  }
}
