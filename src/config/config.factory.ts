import { Config } from './config.interface';

type ConfigFactory = () => Partial<Config>;

export const configFactory: ConfigFactory = () => {
  return {
    databaseUrl: process.env.DATABASE_URL,
  };
};
