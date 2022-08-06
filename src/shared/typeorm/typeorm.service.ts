import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnviormentKeys } from 'src/constants/EnviormentKeys';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>(EnviormentKeys.DB_HOST),
      port: this.config.get<number>(EnviormentKeys.DB_PORT),
      database: this.config.get<string>(EnviormentKeys.DB_NAME),
      username: this.config.get<string>(EnviormentKeys.DB_USERNAME),
      password: this.config.get<string>(EnviormentKeys.DB_PASSWORD),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      ssl: { rejectUnauthorized: false },
      synchronize: this.config.get<string>('NODE_ENV') === 'development', //! never use TRUE in production!
    };
  }
}
