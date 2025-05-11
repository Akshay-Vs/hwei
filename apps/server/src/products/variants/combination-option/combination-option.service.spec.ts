import { Test, TestingModule } from '@nestjs/testing';
import { CombinationOptionService } from './combination-option.service';

describe('CombinationOptionService', () => {
  let service: CombinationOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinationOptionService],
    }).compile();

    service = module.get<CombinationOptionService>(CombinationOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
