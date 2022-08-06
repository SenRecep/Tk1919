import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from 'src/typeorm/Passenger.entity';
import { PassengersController } from './controllers/passengers/passengers.controller';
import { PassengersService } from './services/passengers/passengers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Passenger])],
  controllers: [PassengersController],
  providers: [PassengersService],
})
export class PassengersModule {}
