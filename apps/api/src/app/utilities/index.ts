import * as crypto from 'crypto';

export function generateRandomString(length: number = 24) {
  return crypto.randomBytes((length + 3) / 4 * 3).toString('base64');
}
