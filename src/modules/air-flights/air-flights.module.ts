import { Module } from '@nestjs/common';
import { AirFlightsController } from './controllers/air-flights/air-flights.controller';
import { AirFlightsService } from './services/air-flights/air-flights.service';

@Module({
  controllers: [AirFlightsController],
  providers: [AirFlightsService],
})
export class AirFlightsModule {}
