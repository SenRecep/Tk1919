import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { ThyHttpModuleService } from 'src/shared/httpModule/thyHttpModule.service';
import { ThyController } from './controllers/thy/thy.controller';
import { ThyService } from './services/thy/thy.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: ThyHttpModuleService,
    }),
    CacheModule.register(),
  ],
  controllers: [ThyController],
  providers: [ThyService],
})
export class ThyModule {}
