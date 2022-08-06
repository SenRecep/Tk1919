import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AirFlight } from 'src/typeorm';
import { Repository } from 'typeorm';
import { AirFlightCreateDto } from '../../dtos/AirFlightCreate.dto';
import { AirFlightUpdateDto } from '../../dtos/AirFlightUpdate.dto';
@Injectable()
export class AirFlightsService {
  constructor(
    @InjectRepository(AirFlight)
    private readonly airFlightsRepository: Repository<AirFlight>,
  ) {}
  getByIdAsync(id: number): Promise<AirFlight> {
    return this.airFlightsRepository.findOne({
      where: { id },
      relations: ['tickets'],
    });
  }
  getAllAsync(): Promise<AirFlight[]> {
    return this.airFlightsRepository.find({ relations: ['address'] });
  }
  getAllWhitoutDeleted(): Promise<AirFlight[]> {
    return this.airFlightsRepository.find({
      where: { isDeleted: false },
      relations: ['tickets'],
    });
  }

  async deleteAsync(id: number): Promise<AirFlight> {
    this.airFlightsRepository.update({ id }, { isDeleted: true });
    return await this.getByIdAsync(id);
  }
  async updateAsync(
    id: number,
    airFlightUpdateDto: AirFlightUpdateDto,
  ): Promise<AirFlight> {
    const found = await this.getByIdAsync(id);
    delete found.tickets;
    if (!found) throw new NotFoundException('Air Flight not found');
    for (const key in airFlightUpdateDto) {
      if (
        Object.prototype.hasOwnProperty.call(found, key) &&
        airFlightUpdateDto[key] &&
        typeof airFlightUpdateDto[key] !== 'object'
      ) {
        found[key] = airFlightUpdateDto[key];
      }
    }
    found.isDeleted = false;
    await this.airFlightsRepository.update({ id }, { ...found });
    return found;
  }

  async createAsync(
    airFlightCreateDto: AirFlightCreateDto,
  ): Promise<AirFlight> {
    const airFlight = this.airFlightsRepository.create(airFlightCreateDto);
    return await this.airFlightsRepository.save(airFlight);
  }
}
