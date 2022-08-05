import { Test, TestingModule } from '@nestjs/testing';
import { PassengersController } from './passengers.controller';

describe('PassengersController', () => {
  let controller: PassengersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassengersController],
    }).compile();

    controller = module.get<PassengersController>(PassengersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
