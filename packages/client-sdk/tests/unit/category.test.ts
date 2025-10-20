import { CategoryClient } from '@/helpers/category';
import { StoreClient } from '@/helpers/store';
import { TEST_CONFIG } from '@tests/config/test.config';
import { TEST_ENV } from '@tests/config/test.env';
import { createMockCategory, createMockStore } from '@tests/fixtures/index';
import { mockGetToken, mockGetTokenNull } from '../helpers';
import { Store } from '@hwei/schema/dto/store.schema';

describe('CategoryClient - API Tests', () => {
  let client: CategoryClient;
  let createdCategoryIds: string[] = [];
  const storeClient = new StoreClient(mockGetToken, TEST_ENV.API_BASE_URL);
  let testStore: Store;

  beforeAll(async () => {
    testStore = await storeClient.createStore(
      createMockStore({ name: 'Category Test Store' })
    );
    client = new CategoryClient(mockGetToken, testStore.id, TEST_ENV.API_BASE_URL);
  });

  afterAll(async () => {
    // Cleanup created categories
    for (const id of createdCategoryIds) {
      try {
        await client.deleteCategory(id);
      } catch (error) {
        console.error(`Failed to cleanup category ${id}`);
      }
    }
    // Cleanup test store
    try {
      await storeClient.deleteStore(testStore.id);
    } catch (error) {
      console.error(`Failed to cleanup store ${testStore.id}`);
    }
  });

  describe('CRUD Operations', () => {
    it('should create a new category', async () => {
      const category = createMockCategory();
      const result = await client.createCategory(category);
      createdCategoryIds.push(result.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: category.name,
      }));
    });

    it('should get all categories', async () => {
      const result = await client.getAllCategories();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should get a single category by id', async () => {
      // Create a category first
      const category = createMockCategory({
        name: "Test Category 2"
      });
      const created = await client.createCategory(category);
      createdCategoryIds.push(created.id);

      const result = await client.getCategory(created.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: category.name,
      }));
    });

    it('should update a category', async () => {
      // Create a category first
      const created = await client.createCategory(
        createMockCategory({
          name: "Test Category 3",
        })
      );
      createdCategoryIds.push(created.id);

      const updateData = {
        name: 'Updated Category Name',
      };
      const result = await client.updateCategory(created.id, updateData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: updateData.name,
      }));
    });

    it('should delete a category', async () => {
      // Create a category first
      const created = await client.createCategory(
        createMockCategory({
          name: "Test Category 4",
        })
      );

      await client.deleteCategory(created.id);

      // Verify it's deleted
      try {
        await client.getCategory(created.id);
        fail('Should have thrown 404');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent category', async () => {
      try {
        await client.getCategory('non-existent-id-12345');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 400 for invalid data', async () => {
      try {
        await client.createCategory({ name: '' } as any);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle 401 for unauthorized request', async () => {
      const unauthorizedClient = new CategoryClient(mockGetTokenNull, testStore.id, TEST_ENV.API_BASE_URL);

      try {
        await unauthorizedClient.createCategory(createMockCategory({
          name: "Test Category 5",
        }));
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_UNAUTHORIZED");
      }
    });

    it('should handle 404 when updating non-existent category', async () => {
      try {
        await client.updateCategory('non-existent-id', { name: 'Test' });
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 404 when deleting non-existent category', async () => {
      try {
        await client.deleteCategory('non-existent-id');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });
});
