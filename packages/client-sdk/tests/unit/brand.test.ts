import { BrandClient } from '@/helpers/brand';
import { TEST_CONFIG } from '@tests/config/test.config';
import { TEST_ENV } from '@tests/config/test.env';
import { createMockBrand, createMockStore } from '@tests/fixtures/index';

import { mockGetToken, mockGetTokenNull } from '../helpers';
import { StoreClient } from '@/helpers/store';
import { Store } from '@hwei/schema/dto/store.schema';



describe('BrandClient - API Tests', () => {
  let client: BrandClient;
  let createdBrandIds: string[] = [];
  const storeClient = new StoreClient(mockGetToken, TEST_ENV.API_BASE_URL);
  let testStore: Store;

  beforeAll(async () => {
    testStore = await storeClient.createStore(
      createMockStore({ name: 'Brand Test Store' })
    )
    client = new BrandClient(mockGetToken, testStore.id, TEST_ENV.API_BASE_URL);
  });

  afterAll(async () => {
    // Cleanup created brands
    for (const id of createdBrandIds) {
      try {
        await storeClient.deleteStore(testStore.id);
      } catch (error) {
        console.error(`Failed to cleanup brand ${id}`);
      }
    }
  });

  describe('CRUD Operations', () => {
    it('should create a new brand', async () => {
      const brand = createMockBrand()
      const result = await client.createBrand(brand);
      createdBrandIds.push(result.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: brand.name,
        description: brand.description,
        image: brand.image,
        storeId: testStore.id
      }))
    });

    it('should get all brands', async () => {
      const result = await client.getAllBrands();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should get a single brand by id', async () => {
      // Create a brand first
      const brand = createMockBrand({
        name: "Test brand 2"
      })
      const created = await client.createBrand(brand);
      createdBrandIds.push(created.id);

      const result = await client.getBrand(created.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: brand.name,
        description: brand.description,
        image: brand.image,
        storeId: testStore.id
      }))
    });

    it('should update a brand', async () => {
      // Create a brand first
      const created = await client.createBrand(
        createMockBrand({
          name: "Test Brand 3",
        })
      );
      createdBrandIds.push(created.id);

      const updateData = {
        name: 'Updated Brand Name', description: "Updated brand description",
        image: TEST_CONFIG.assets.images.alternate
      };
      const result = await client.updateBrand(created.id, updateData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: "Updated Brand Name",
        description: "Updated brand description",
        image: TEST_CONFIG.assets.images.alternate,
        storeId: testStore.id
      }))
    });

    it('should delete a brand', async () => {
      // Create a brand first
      const created = await client.createBrand(
        createMockBrand({
          name: "Test Brand 4",
        })
      );

      await client.deleteBrand(created.id);

      // Verify it's deleted
      try {
        await client.getBrand(created.id);
        fail('Should have thrown 404');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  })

  describe('Error Handling', () => {
    it('should handle 404 for non-existent brand', async () => {
      try {
        await client.getBrand('non-existent-id-12345');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 400 for invalid data', async () => {
      try {
        await client.createBrand({ name: '' } as any);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle 401 for unauthorized request', async () => {
      const unauthorizedClient = new BrandClient(mockGetTokenNull, testStore.id, TEST_ENV.API_BASE_URL);

      try {
        await unauthorizedClient.createBrand(createMockBrand({
          name: "Test Brand 5",
        }));
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_UNAUTHORIZED");
      }
    });

    it('should handle 404 when updating non-existent brand', async () => {
      try {
        await client.updateBrand('non-existent-id', { name: 'Test' });
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 404 when deleting non-existent brand', async () => {
      try {
        await client.deleteBrand('non-existent-id');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });
});
