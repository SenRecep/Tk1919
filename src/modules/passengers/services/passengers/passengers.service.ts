import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Passenger } from 'src/typeorm/Passenger.entity';
import { Repository } from 'typeorm';
import { PassengerCreateDto } from '../../dtos/PassengerCreate.dto';
import { PassengerUpdateDto } from '../../dtos/PassengerUpdate.dto';

@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengersRepository: Repository<Passenger>,
  ) {}
  getByIdAsync(id: number): Promise<Passenger> {
    return this.passengersRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });
  }
  getAllAsync(): Promise<Passenger[]> {
    return this.passengersRepository.find({ relations: ['address'] });
  }
  getAllWhitoutDeleted(): Promise<Passenger[]> {
    return this.passengersRepository.find({
      where: { isDeleted: false },
      relations: ['tickets'],
    });
  }

  async deleteAsync(id: number): Promise<Passenger> {
    this.passengersRepository.update({ id }, { isDeleted: true });
    return await this.getByIdAsync(id);
  }
  async updateAsync(
    id: number,
    passengerUpdateDto: PassengerUpdateDto,
  ): Promise<Passenger> {
    const found = await this.getByIdAsync(id);
    delete found.tickets;
    if (!found) throw new NotFoundException('Passenger not found');
    for (const key in passengerUpdateDto) {
      if (
        Object.prototype.hasOwnProperty.call(found, key) &&
        passengerUpdateDto[key] &&
        typeof passengerUpdateDto[key] !== 'object'
      ) {
        found[key] = passengerUpdateDto[key];
      }
    }
    await this.passengersRepository.update({ id }, { ...found });
    return found;
  }

  async createAsync(
    passengerCreateDto: PassengerCreateDto,
  ): Promise<Passenger> {
    const passenger = this.passengersRepository.create(passengerCreateDto);
    return await this.passengersRepository.save(passenger);
  }
}
