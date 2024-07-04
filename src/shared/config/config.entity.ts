export interface Config {
  databaseUrl: string;

  hasDocs: boolean;

  passwordHashSalt: number;

  jwtAccessSecret: string;
  jwtAccessExpiresIn: string;

  jwtRefreshSecret: string;
  jwtRefreshExpiresIn: string;
}
