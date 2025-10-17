import { StoreClient } from '@/helpers/store';
import { TEST_ENV } from '@tests/config/test.env';
import { createMockStore } from '@tests/fixtures/index';
import { mockGetToken, mockGetTokenNull } from '../helpers';
import { UpdateStore } from '@hwei/schema/dto/store.schema';

describe('StoreClient - API Tests', () => {
  let client: StoreClient;
  let createdStoreIds: string[] = [];

  beforeAll(async () => {
    client = new StoreClient(mockGetToken, TEST_ENV.API_BASE_URL);
  });

  afterAll(async () => {
    // Cleanup created stores
    for (const id of createdStoreIds) {
      try {
        await client.deleteStore(id);
      } catch (error) {
        console.error(`Failed to cleanup store ${id}`);
      }
    }
  });

  describe('CRUD Operations', () => {
    it('should create a new store', async () => {
      const store = createMockStore();
      const result = await client.createStore(store);
      createdStoreIds.push(result.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: store.name,
        icon: store.icon,
      }));
    });

    it('should get all stores', async () => {
      const result = await client.getAllStores();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should get a single store by id', async () => {
      // Create a store first
      const store = createMockStore({
        name: "Test Store 2"
      });
      const created = await client.createStore(store);
      createdStoreIds.push(created.id);

      const result = await client.getStore(created.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: store.name,
        icon: store.icon,
      }));
    });

    it('should update a store', async () => {
      // Create a store first
      const created = await client.createStore(
        createMockStore({
          name: "Test Store 3",
        })
      );
      createdStoreIds.push(created.id);

      const updateData: UpdateStore = {
        name: 'Updated Store Name',
        icon: 'StoreIcon',
        version: 1,
      };
      const result = await client.updateStore(created.id, updateData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: updateData.name,
        icon: updateData.icon,
        version: updateData.version,
      }));
    });

    it('should delete a store', async () => {
      // Create a store first
      const created = await client.createStore(
        createMockStore({
          name: "Test Store 4",
        })
      );

      await client.deleteStore(created.id);

      // Verify it's deleted
      try {
        await client.getStore(created.id);
        fail('Should have thrown 404');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent store', async () => {
      try {
        await client.getStore('non-existent-id-12345');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 400 for invalid data', async () => {
      try {
        await client.createStore({ name: '' } as any);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle 401 for unauthorized request', async () => {
      const unauthorizedClient = new StoreClient(mockGetTokenNull, TEST_ENV.API_BASE_URL);

      try {
        await unauthorizedClient.createStore(createMockStore({
          name: "Test Store 5",
        }));
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_UNAUTHORIZED");
      }
    });

    it('should handle 404 when updating non-existent store', async () => {
      try {
        await client.updateStore('non-existent-id', { name: 'Test' });
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 404 when deleting non-existent store', async () => {
      try {
        await client.deleteStore('non-existent-id');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });
});
