import { Test, TestingModule } from '@nestjs/testing';
import { UpdateBrandDto } from 'src/brands/schemas/brands.schema';
import { CreateStoreDto } from '../schemas/store.schema';
import { StoresController } from '../stores.controller';
import { StoresService } from '../stores.service';
import { User } from '@clerk/backend';

describe('StoresController', () => {
  let controller: StoresController;
  let service: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    createOne: jest.Mock;
    editOne: jest.Mock;
    deleteOne: jest.Mock;
  };

  const mockUser = {
    id: 'user_2uzhsC5fc9OTHNTxRN5tuGG03zU',
  } as unknown as User;
  const mockStore = { id: 'store-1', name: 'Mock Store', userId: 'user-123' };

  beforeEach(async () => {
    service = {
      findAll: jest.fn().mockResolvedValue([mockStore]),
      findOne: jest.fn().mockResolvedValue(mockStore),
      createOne: jest.fn().mockResolvedValue(mockStore),
      editOne: jest.fn().mockResolvedValue(mockStore),
      deleteOne: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [{ provide: StoresService, useValue: service }],
    }).compile();

    controller = module.get<StoresController>(StoresController);
  });

  it('should return all stores for a user', async () => {
    const result = await controller.findAll(mockUser);
    expect(service.findAll).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual([mockStore]);
  });

  it('should return one store by id and user', async () => {
    const result = await controller.findOne(mockUser, 'store-1');
    expect(service.findOne).toHaveBeenCalledWith(mockUser, 'store-1');
    expect(result).toEqual(mockStore);
  });

  it('should create a new store', async () => {
    const input: CreateStoreDto = {
      name: 'New Store',
      icon: 'Store',
      version: 1,
    };
    const result = await controller.createOne(input, mockUser);
    expect(service.createOne).toHaveBeenCalledWith(mockUser, input);
    expect(result).toEqual(mockStore);
  });

  it('should update a store', async () => {
    const input: UpdateBrandDto = { name: 'Updated Store' };
    const result = await controller.editOne(mockUser, 'store-1', input);
    expect(service.editOne).toHaveBeenCalledWith(mockUser, 'store-1', input);
    expect(result).toEqual(mockStore);
  });

  it('should delete a store', async () => {
    const result = await controller.deleteOne(mockUser, 'store-1');
    expect(service.deleteOne).toHaveBeenCalledWith(mockUser, 'store-1');
    expect(result).toBeUndefined();
  });
});
