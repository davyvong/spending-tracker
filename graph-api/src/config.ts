import 'dotenv/config';
import fs from 'fs';

Object.assign(process.env, {
  GOOGLE_APPLICATION_CREDENTIALS: process.cwd() + '/serviceaccount.json',
  SERVER_HOST: process.env.SERVER_HOST,
  SERVER_PORT: parseInt(process.env.SERVER_PORT, 10),
});

fs.writeFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.GOOGLE_SERVICE_ACCOUNT);
