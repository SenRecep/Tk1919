import { Test, TestingModule } from '@nestjs/testing';
import { AirFlightsService } from './air-flights.service';

describe('AirFlightsService', () => {
  let service: AirFlightsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AirFlightsService],
    }).compile();

    service = module.get<AirFlightsService>(AirFlightsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
