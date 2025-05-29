import { Test, TestingModule } from '@nestjs/testing';
import { PricingController } from './pricing.controller';

describe('PricingController', () => {
  let controller: PricingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricingController],
    }).compile();

    controller = module.get<PricingController>(PricingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
