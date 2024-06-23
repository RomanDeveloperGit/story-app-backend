import { Config } from '@/core/config/model';

type ConfigFactory = () => Partial<Config>;

export const configFactory: ConfigFactory = () => {
  return {
    databaseUrl: process.env.DATABASE_URL,
  };
};
