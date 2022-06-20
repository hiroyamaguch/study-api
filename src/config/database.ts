import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from './enviroments';

export class Database {
  static buildSettings(): DataSourceOptions {
    return {
      name: env.app.name,
      type: 'mysql',
      host: env.typeorm.host,
      port: env.typeorm.port,
      username: env.typeorm.username,
      password: env.typeorm.password,
      database: env.typeorm.database,
      entities: ['dist/src/modules/**/entities/*.js'],
      migrations: ['dist/migrations/*.js'],
      migrationsTableName: 'migrations',
      synchronize: false,
      timezone: 'Z',
    };
  }

  static async build() {
    return TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        host: env.typeorm.host,
        port: env.typeorm.port,
        username: env.typeorm.username,
        password: env.typeorm.password,
        database: env.typeorm.database,
        entities: ['dist/src/modules/**/entities/*{.ts,.js}'],
        migrations: ['dist/migrations/*.js'],
        migrationsTableName: 'migrations',
        autoLoadEntities: true,
        synchronize: false,
        timezone: 'Z',
        cli: {
          migrationsDir: 'migrations',
        },
      }),
    });
  }

  static registerEntities(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}

export const dataSource: DataSource = new DataSource(Database.buildSettings());
