import { Test, TestingModule } from '@nestjs/testing';
import { CombinationService } from './combination.service';

describe('CombinationService', () => {
  let service: CombinationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinationService],
    }).compile();

    service = module.get<CombinationService>(CombinationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
