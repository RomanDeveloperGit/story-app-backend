import { Config } from './config.entity';

type ConfigFactory = () => Config;

export const configFactory: ConfigFactory = () => {
  return {
    databaseUrl: String(process.env.DATABASE_URL),
    hasDocs: Boolean(process.env.HAS_DOCS),
  };
};
