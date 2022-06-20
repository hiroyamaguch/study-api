import * as dotenv from 'dotenv';

interface IApp {
  name: string;
  env: string | 'homolog' | 'development' | 'production';
  port: number;
}

interface ITypeorm {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
  connection: string;
  entities: string;
  migrationsTableName: string;
  migrationDir: string;
}

export class BaseEnv {
  app: IApp;
  typeorm: ITypeorm;

  constructor() {
    dotenv.config();
    this.setBaseEnvVariables();
  }

  setBaseEnvVariables(): void {
    this.app = {
      name: process.env.APP_NAME,
      env: process.env.APP_ENV || 'development',
      port: parseInt(process.env.PORT) || 8000,
    };
    this.typeorm = {
      host: process.env.TYPEORM_HOST || 'localhost',
      port: parseInt(process.env.TYPEORM_PORT) || 3306,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      logging: Boolean(process.env.TYPEORM_LOGGING),
      connection: process.env.TYPEORM_CONNECTION,
      entities: process.env.TYPEORM_ENTITIES,
      migrationsTableName: process.env.TYPEORM_MIGRATION_TABLE_NAME,
      migrationDir: process.env.TYPEORM_MIGRATION_DIR,
    };
  }

  isProduction(): boolean {
    return this.app.env === 'production';
  }
}

export const env = new BaseEnv();
