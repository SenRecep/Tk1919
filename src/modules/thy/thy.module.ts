import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ThyController } from './controllers/thy/thy.controller';
import { ThyService } from './services/thy/thy.service';

@Module({
  imports: [HttpModule],
  controllers: [ThyController],
  providers: [ThyService],
})
export class ThyModule {}
