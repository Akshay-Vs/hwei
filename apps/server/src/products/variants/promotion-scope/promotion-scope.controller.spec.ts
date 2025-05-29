import { Test, TestingModule } from '@nestjs/testing';
import { PromotionScopeController } from './promotion-scope.controller';

describe('PromotionScopeController', () => {
  let controller: PromotionScopeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromotionScopeController],
    }).compile();

    controller = module.get<PromotionScopeController>(PromotionScopeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
