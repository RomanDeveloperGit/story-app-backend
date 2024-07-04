import { Config } from './config.entity';

type ConfigFactory = () => Config;


export const configFactory: ConfigFactory = () => {
  return {
    databaseUrl: String(process.env.DATABASE_URL),

    hasDocs: Boolean(process.env.HAS_DOCS),

    passwordHashSalt: Number(process.env.PASSWORD_HASH_SALT),

    jwtAccessSecret: String(process.env.JWT_ACCESS_SECRET),
    jwtAccessExpiresIn: String(process.env.JWT_ACCESS_EXPIRES_IN),

    jwtRefreshSecret: String(process.env.JWT_REFRESH_SECRET),
    jwtRefreshExpiresIn: String(process.env.JWT_REFRESH_EXPIRES_IN),
  };
};
