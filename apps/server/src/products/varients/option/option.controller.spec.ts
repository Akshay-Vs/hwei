import { Test, TestingModule } from '@nestjs/testing';
import { OptionController } from './option.controller';

describe('OptionController', () => {
  let controller: OptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionController],
    }).compile();

    controller = module.get<OptionController>(OptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
