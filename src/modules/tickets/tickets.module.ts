import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirFlight, Passenger, Ticket } from 'src/typeorm';
import { TicketsController } from './controllers/tickets/tickets.controller';
import { TicketsService } from './services/tickets/tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, Passenger, AirFlight])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
