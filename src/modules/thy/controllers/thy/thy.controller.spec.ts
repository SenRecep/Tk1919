import { Test, TestingModule } from '@nestjs/testing';
import { ThyController } from './thy.controller';

describe('ThyController', () => {
  let controller: ThyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThyController],
    }).compile();

    controller = module.get<ThyController>(ThyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
