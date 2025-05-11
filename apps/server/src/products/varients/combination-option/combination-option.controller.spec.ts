import { Test, TestingModule } from '@nestjs/testing';
import { CombinationOptionController } from './combination-option.controller';

describe('CombinationOptionController', () => {
  let controller: CombinationOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinationOptionController],
    }).compile();

    controller = module.get<CombinationOptionController>(CombinationOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
