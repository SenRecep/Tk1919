import { Module } from '@nestjs/common';
import { PassengersController } from './controllers/passengers/passengers.controller';
import { PassengersService } from './services/passengers/passengers.service';

@Module({
  controllers: [PassengersController],
  providers: [PassengersService],
})
export class PassengersModule {}
