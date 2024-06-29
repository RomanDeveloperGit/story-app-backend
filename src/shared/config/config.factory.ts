import { Config } from './config.entity';

type ConfigFactory = () => Config;

export const configFactory: ConfigFactory = () => {
  return {
    databaseUrl: String(process.env.DATABASE_URL),
    hasDocs: Boolean(process.env.HAS_DOCS),
    jwtSecret: String(process.env.JWT_SECRET),
    jwtExpiresIn: String(process.env.JWT_EXPIRES_IN),
  };
};
