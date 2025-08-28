import { randomBytes } from 'crypto';

const secret = randomBytes(64).toString('hex');
console.log('JWT_SECRET=', secret);
// npx ts-node src/auth/config/generar-secret.ts