import { Test, TestingModule } from '@nestjs/testing';
import { CombinationController } from './combination.controller';

describe('CombinationController', () => {
  let controller: CombinationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinationController],
    }).compile();

    controller = module.get<CombinationController>(CombinationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
