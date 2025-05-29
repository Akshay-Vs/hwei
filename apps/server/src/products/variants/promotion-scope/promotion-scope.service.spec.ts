import { Test, TestingModule } from '@nestjs/testing';
import { PromotionScopeService } from './promotion-scope.service';

describe('PromotionScopeService', () => {
  let service: PromotionScopeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionScopeService],
    }).compile();

    service = module.get<PromotionScopeService>(PromotionScopeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
