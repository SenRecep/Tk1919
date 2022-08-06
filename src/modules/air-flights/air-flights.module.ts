import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirFlight } from 'src/typeorm';
import { AirFlightsController } from './controllers/air-flights/air-flights.controller';
import { AirFlightsService } from './services/air-flights/air-flights.service';

@Module({
  imports: [TypeOrmModule.forFeature([AirFlight])],
  controllers: [AirFlightsController],
  providers: [AirFlightsService],
})
export class AirFlightsModule {}
