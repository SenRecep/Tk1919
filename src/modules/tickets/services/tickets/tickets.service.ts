import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirFlight, Passenger, Ticket } from 'src/typeorm';
import { Repository } from 'typeorm';
import { TicketCreateDto } from '../../dtos/TicketCreate.dto';
import { TicketUpdateDto } from '../../dtos/TicketUpdate.dto';
@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
    @InjectRepository(Passenger)
    private readonly passengersRepository: Repository<Passenger>,
    @InjectRepository(AirFlight)
    private readonly airFlightsRepository: Repository<AirFlight>,
  ) {}
  getByIdAsync(id: number): Promise<Ticket> {
    return this.ticketsRepository.findOne({
      where: { id },
      relations: ['passenger', 'airFlight'],
    });
  }
  getAllAsync(): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      relations: ['passenger', 'airFlight'],
    });
  }
  getAllWhitoutDeleted(): Promise<Ticket[]> {
    return this.ticketsRepository.find({
      where: { isDeleted: false },
      relations: ['passenger', 'airFlight'],
    });
  }

  async deleteAsync(id: number): Promise<Ticket> {
    this.ticketsRepository.update({ id }, { isDeleted: true });
    return await this.getByIdAsync(id);
  }
  async updateAsync(
    id: number,
    ticketUpdateDto: TicketUpdateDto,
  ): Promise<Ticket> {
    const found = await this.getByIdAsync(id);
    delete found.airFlight, found.passenger;
    if (!found) throw new NotFoundException('Ticket not found');
    for (const key in ticketUpdateDto) {
      if (
        Object.prototype.hasOwnProperty.call(found, key) &&
        ticketUpdateDto[key] &&
        typeof ticketUpdateDto[key] !== 'object'
      ) {
        found[key] = ticketUpdateDto[key];
      }
    }
    found.isDeleted = false;
    await this.validationTicketAsync(
      ticketUpdateDto.passengerId,
      ticketUpdateDto.airFlightId,
      ticketUpdateDto.seatNumber,
      ticketUpdateDto.pnr,
    );
    await this.ticketsRepository.update({ id }, { ...found });
    return found;
  }

  async createAsync(ticketCreateDto: TicketCreateDto) {
    await this.validationTicketAsync(
      ticketCreateDto.passengerId,
      ticketCreateDto.airFlightId,
      ticketCreateDto.seatNumber,
      ticketCreateDto.pnr,
    );
    const ticket = this.ticketsRepository.create(ticketCreateDto);
    return await this.ticketsRepository.save(ticket);
  }

  async validationTicketAsync(
    passengerId: number,
    airFlightId: number,
    seatNumber: string,
    pnr: string,
  ) {
    const passenger = await this.passengerValidationAsync(passengerId);
    const airFlight = await this.airFlightValidationAsync(airFlightId);
    if (airFlight.tickets.length === airFlight.capacity)
      throw new BadRequestException('Air Flight is full');
    const foundTicket = airFlight.tickets.find(
      (x) => x.passengerId === passenger.id && x.isDeleted === false,
    );
    if (foundTicket && foundTicket.isDeleted === false)
      throw new BadRequestException('Passenger already has a ticket');
    const foundSeatNumber = airFlight.tickets.find(
      (x) => x.seatNumber === seatNumber,
    );
    if (foundSeatNumber && foundSeatNumber.isDeleted === false)
      throw new BadRequestException('Seat number already taken');
    const foundPnr = airFlight.tickets.find((x) => x.pnr === pnr);
    if (foundPnr && foundPnr.isDeleted === false)
      throw new BadRequestException('PNR already taken');
  }

  async passengerValidationAsync(passengerId: number) {
    const passenger = await this.passengersRepository.findOne({
      where: { id: passengerId, isDeleted: false },
    });
    if (!passenger) throw new NotFoundException('Passenger not found');
    return passenger;
  }
  async airFlightValidationAsync(airFlightId: number) {
    const airFlight = await this.airFlightsRepository.findOne({
      where: { id: airFlightId, isDeleted: false },
      relations: ['tickets'],
    });
    if (!airFlight) throw new NotFoundException('Air Flight not found');
    return airFlight;
  }
}
