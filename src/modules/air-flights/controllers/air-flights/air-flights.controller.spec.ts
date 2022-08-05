import { Test, TestingModule } from '@nestjs/testing';
import { AirFlightsController } from './air-flights.controller';

describe('AirFlightsController', () => {
  let controller: AirFlightsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AirFlightsController],
    }).compile();

    controller = module.get<AirFlightsController>(AirFlightsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
