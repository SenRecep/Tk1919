import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnviormentKeys } from 'src/constants/EnviormentKeys';

@Injectable()
export class ThyHttpModuleService implements HttpModuleOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;
  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      baseURL: this.config.get<string>(EnviormentKeys.THY_API_BASE_URL),
      headers: {
        apikey: this.config.get<string>(EnviormentKeys.THY_API_KEY),
        apisecret: this.config.get<string>(EnviormentKeys.THY_API_SECRET_KEY),
      },
    };
  }
}
