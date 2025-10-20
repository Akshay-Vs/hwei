import { TagClient } from '@/helpers/tag';
import { StoreClient } from '@/helpers/store';
import { TEST_ENV } from '@tests/config/test.env';
import { createMockTag, createMockStore } from '@tests/fixtures/index';
import { mockGetToken, mockGetTokenNull } from '../helpers';
import { Store } from '@hwei/schema/dto/store.schema';

describe('TagClient - API Tests', () => {
  let client: TagClient;
  let createdTagIds: string[] = [];
  const storeClient = new StoreClient(mockGetToken, TEST_ENV.API_BASE_URL);
  let testStore: Store;

  beforeAll(async () => {
    testStore = await storeClient.createStore(
      createMockStore({ name: 'Tag Test Store' })
    );
    client = new TagClient(mockGetToken, testStore.id, TEST_ENV.API_BASE_URL);
  });

  afterAll(async () => {
    // Cleanup created tags
    for (const id of createdTagIds) {
      try {
        await client.deleteTag(id);
      } catch (error) {
        console.error(`Failed to cleanup tag ${id}`);
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
    it('should create multiple tags', async () => {
      const tag = createMockTag();
      const result = await client.createTag(tag);

      expect(Array.isArray(result)).toBe(true);

      // result is an array of tag objects
      const expectedTags = tag.names.map(name =>
        expect.objectContaining({
          id: expect.any(String),
          name,
        })
      );

      expect(result).toEqual(expect.arrayContaining(expectedTags));
    });

    it('should get all tags with pagination', async () => {
      const result = await client.getAllTags('', 0, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should get all tags with search query', async () => {
      const tag = createMockTag({ names: ["Test Tag 3"] });
      const created = await client.createTag(tag);

      expect(created.length).toBeGreaterThan(0);

      const first = created[0]!;
      createdTagIds.push(first.id);

      // Now test the search endpoint
      const result = await client.getAllTags(first.name, 0, 1);

      expect(Array.isArray(result)).toBe(true);
      expect(result.some(t => t.id === first.id)).toBe(true);
    });


    it('should get all tags with skip and take parameters', async () => {
      // Create multiple tags
      for (let i = 0; i < 3; i++) {
        const tag = createMockTag({
          names: [`Pagination Test Tag ${i}`]
        });
        const created = await client.createTag(tag);
        createdTagIds.push(created[i]?.id!);
      }

      const firstPage = await client.getAllTags('', 0, 2);
      const secondPage = await client.getAllTags('', 2, 2);

      expect(firstPage.length).toBeLessThanOrEqual(2);
      expect(secondPage.length).toBeGreaterThanOrEqual(0);
    });

    it('should get a single tag by id', async () => {
      // Create a tag first
      const tag = createMockTag({
        names: ["Test Tag 2"]
      });
      const created = await client.createTag(tag);

      expect(Array.isArray(created)).toBe(true);
      expect(created.length).toBeGreaterThanOrEqual(0);

      const first = created[0]!;
      createdTagIds.push(first.id);

      const result = await client.getTag(first.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: first.name,
      }));
    });

    it('should update a tag', async () => {
      // Create a tag first
      const created = await client.createTag(
        createMockTag({
          names: ["Test Tag 4"],
        })
      );

      expect(Array.isArray(created)).toBe(true);
      expect(created.length).toBeGreaterThanOrEqual(0);

      const first = created[0]!;
      createdTagIds.push(first.id);

      createdTagIds.push(first.id);
      const timestamp = new Date().toISOString();

      const updateData = {
        name: `Updated Tag Name ${timestamp}`,
      };
      const result = await client.updateTag(first.id, updateData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        name: updateData.name,
      }));
    });

    it('should delete a tag', async () => {
      // Create a tag first
      const created = await client.createTag(
        createMockTag({
          names: ["Test Tag 4"],
        })
      );

      expect(Array.isArray(created)).toBe(true);
      expect(created.length).toBeGreaterThanOrEqual(0);

      const first = created[0]!;

      await client.deleteTag(first.id);

      // Verify it's deleted
      try {
        await client.getTag(first.id);
        fail('Should have thrown 404');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent tag', async () => {
      try {
        await client.getTag('cmxxxxxxxxxxxxxxxxxxxxxxx');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 400 for invalid data', async () => {
      try {
        await client.createTag({ name: '' } as any);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle 400 when passing non cuid tag id', async () => {
      try {
        await client.updateTag('xxxxxxxxxxxxxxxxxxxxxxxxx', { name: 'Test' });
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle 401 for unauthorized request', async () => {
      const unauthorizedClient = new TagClient(mockGetTokenNull, testStore.id, TEST_ENV.API_BASE_URL);

      try {
        await unauthorizedClient.createTag(createMockTag({
          names: ["Test Tag 5"],
        }));
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_UNAUTHORIZED");
      }
    });

    it('should handle 404 when updating non-existent tag', async () => {
      try {
        await client.updateTag('cmxxxxxxxxxxxxxxxxxxxxxxx', { name: 'Test' });
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 404 when deleting non-existent tag', async () => {
      try {
        await client.deleteTag('cmxxxxxxxxxxxxxxxxxxxxxxx');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle invalid pagination parameters', async () => {
      try {
        await client.getAllTags('', -1, -10);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });
  });

  describe('Pagination Edge Cases', () => {
    it('should handle empty search results', async () => {
      const result = await client.getAllTags('non-existent-search-query-xxxxxxx', 0, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle large skip value', async () => {
      const result = await client.getAllTags('', 10000, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle zero take value', async () => {
      const result = await client.getAllTags('', 0, 0);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
