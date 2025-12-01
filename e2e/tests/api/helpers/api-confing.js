import fs from 'fs';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), ".env")});

const cleanEnvVar = (value) => {
  if (!value) return undefined;
  // Remove quotes, spaces, and trailing commas - handle all cases
  return value.replace(/^[\s"']+|[\s"',]+$/g, '');
};


export const apiConfig = {
  baseURLQualificationRuleSTG: cleanEnvVar(process.env.API_URL_STG),

};


export const loadPayload = (payloadPath) => {
  return JSON.parse(fs.readFileSync(payloadPath, 'utf8'));
};