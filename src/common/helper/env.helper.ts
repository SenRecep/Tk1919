import { existsSync } from 'fs';
import { resolve } from 'path';
import { EnviormentKeys } from 'src/constants/EnviormentKeys';

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}

export const PORT = process.env[EnviormentKeys.PORT];
export const SESSION_MAXAGE = +process.env[EnviormentKeys.SESSION_MAXAGE];
export const SESSION_SECRET = process.env[EnviormentKeys.SESSION_SECRET];
export const PUBLIC_KEY = process.env[EnviormentKeys.PUBLIC_KEY];
export const JWT_SECRET = process.env[EnviormentKeys.JWT_SECRET];
export const JWT_EXPIRES_IN = process.env[EnviormentKeys.JWT_EXPIRES_IN];
