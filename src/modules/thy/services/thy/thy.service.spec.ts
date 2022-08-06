import { Test, TestingModule } from '@nestjs/testing';
import { ThyService } from './thy.service';

describe('ThyService', () => {
  let service: ThyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThyService],
    }).compile();

    service = module.get<ThyService>(ThyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
