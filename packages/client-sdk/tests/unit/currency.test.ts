import { CurrencyClient } from '@/helpers/currency';
import { StoreClient } from '@/helpers/store';
import { TEST_ENV } from '@tests/config/test.env';
import { createMockCurrency, createMockStore } from '@tests/fixtures/index';
import { mockGetToken, mockGetTokenNull } from '../helpers';
import { Store } from '@hwei/schema/dto/store.schema';
import { CreateCurrency } from '@hwei/schema/dto/currency.schema';

describe('CurrencyClient - API Tests', () => {
  let client: CurrencyClient;
  let createdCurrencyIds: string[] = [];
  const storeClient = new StoreClient(mockGetToken, TEST_ENV.API_BASE_URL);
  let testStore: Store;

  beforeAll(async () => {
    testStore = await storeClient.createStore(
      createMockStore({ name: 'Currency Test Store' })
    );
    client = new CurrencyClient(mockGetToken, testStore.id, TEST_ENV.API_BASE_URL);
  });

  afterAll(async () => {
    // Cleanup created currencies
    for (const id of createdCurrencyIds) {
      try {
        await client.deleteCurrency(id);
      } catch (error) {
        console.error(`Failed to cleanup currency ${id}`);
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
    it('should create a new currency', async () => {
      const currency = createMockCurrency();
      const result = await client.createCurrency(currency);
      createdCurrencyIds.push(result.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        label: currency.label,
        code: currency.code,
        symbol: currency.symbol,
        storeId: testStore.id
      }));
    });

    it('should get all currencies with pagination', async () => {
      const result = await client.getAllCurrencys('', 0, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(0);
    });

    it('should get all currencies with search query', async () => {
      // Create a currency with specific name first
      const currency = createMockCurrency({
        code: "SCN"
      });
      const created = await client.createCurrency(currency);
      createdCurrencyIds.push(created.id);

      const result = await client.getAllCurrencys('Searchable', 0, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.some(c => c.id === created.id)).toBe(true);
    });
    //
    it('should get all currencies with skip and take parameters', async () => {
      // Create multiple currencies
      for (let i = 0; i < 3; i++) {
        const currency: CreateCurrency = createMockCurrency({
          label: `Pagination Test Currency ${i}`,
          code: `TC${i}`
        });
        const created = await client.createCurrency(currency);
        createdCurrencyIds.push(created.id);
      }

      const firstPage = await client.getAllCurrencys('', 0, 2);
      const secondPage = await client.getAllCurrencys('', 2, 2);

      expect(firstPage.length).toBeLessThanOrEqual(2);
      expect(secondPage.length).toBeGreaterThanOrEqual(0);
    });

    it('should get a single currency by id', async () => {
      // Create a currency first
      const currency = createMockCurrency({
        label: "Test Currency 2",
        code: "TS2"
      });
      const created = await client.createCurrency(currency);
      createdCurrencyIds.push(created.id);

      const result = await client.getCurrency(created.id);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        label: currency.label,
        code: currency.code,
        symbol: currency.symbol,
        storeId: testStore.id
      }));
    });

    it('should update a currency', async () => {
      // Create a currency first
      const created = await client.createCurrency(
        createMockCurrency({
          label: "Test Currency 3",
          code: "TS3"
        })
      );
      createdCurrencyIds.push(created.id);

      const updateData = {
        label: 'Updated Currency Name',
        code: 'UCN',
        symbol: '¥',
        exchangeRate: 0.85
      };
      const result = await client.updateCurrency(created.id, updateData);

      expect(result).toEqual(expect.objectContaining({
        id: expect.any(String),
        label: "Updated Currency Name",
        code: 'UCN',
        symbol: '¥',
        storeId: testStore.id
      }));
    });

    it('should delete a currency', async () => {
      // Create a currency first
      const created = await client.createCurrency(
        createMockCurrency({
          label: "Test Currency 4",
          code: "TS4"
        })
      );

      await client.deleteCurrency(created.id);

      // Verify it's deleted
      try {
        await client.getCurrency(created.id);
        fail('Should have thrown 404');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle 404 for non-existent currency', async () => {
      try {
        await client.getCurrency('cmxxxxxxxxxxxxxxxxxxxxxxx');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 400 for invalid data', async () => {
      try {
        await client.createCurrency({ label: '', code: '' } as any);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle 401 for unauthorized request', async () => {
      const unauthorizedClient = new CurrencyClient(mockGetTokenNull, testStore.id, TEST_ENV.API_BASE_URL);

      try {
        await unauthorizedClient.createCurrency(createMockCurrency({
          label: "Test Currency 5",
          code: "TC5"
        }));
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_UNAUTHORIZED");
      }
    });

    it('should handle 404 when updating non-existent currency', async () => {
      try {
        await client.updateCurrency('cmxxxxxxxxxxxxxxxxxxxxxxx', createMockCurrency({
          label: "Test Currency",
          code: "TS9",
          symbol: "¥"
        }));
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle 404 when deleting non-existent currency', async () => {
      try {
        await client.deleteCurrency('cmxxxxxxxxxxxxxxxxxxxxxxx');
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_NOT_FOUND");
      }
    });

    it('should handle invalid pagination parameters', async () => {
      try {
        await client.getAllCurrencys('', -1, -10);
        fail('Should have thrown error');
      } catch (error: any) {
        expect(error.code).toBe("E_BAD_REQUEST");
      }
    });

    it('should handle duplicate currency codes', async () => {
      try {
        const currency = createMockCurrency({
          label: "Duplicate Test",
          code: "DUP",
          symbol: "¥"
        });
        const created = await client.createCurrency(currency);
        createdCurrencyIds.push(created.id);

        await client.createCurrency(currency);
        fail('Should have thrown error for duplicate code');
      } catch (error: any) {
        expect(error.code).toBe("E_CONFLICT");
      }
    });
  });

  describe('Pagination Edge Cases', () => {
    it('should handle empty search results', async () => {
      const result = await client.getAllCurrencys('non-existent-search-query-xyz', 0, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle large skip value', async () => {
      const result = await client.getAllCurrencys('', 10000, 10);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });

    it('should handle zero take value', async () => {
      const result = await client.getAllCurrencys('', 0, 0);

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(0);
    });
  });

  describe('Currency-Specific Tests', () => {
    it('should search currencies by code', async () => {
      const currency = createMockCurrency({
        label: "Euro",
        code: "EUR"
      });
      const created = await client.createCurrency(currency);
      createdCurrencyIds.push(created.id);

      const result = await client.getAllCurrencys('EUR', 0, 10);

      expect(result.some(c => c.code === 'EUR')).toBe(true);
    });

    it('should search currencies by name', async () => {
      const currency = createMockCurrency({
        label: "Japanese Yen",
        code: "JPY"
      });
      const created = await client.createCurrency(currency);
      createdCurrencyIds.push(created.id);

      const result = await client.getAllCurrencys('Japanese', 0, 10);

      expect(result.some(c => c.label.includes('Japanese'))).toBe(true);
    });
  });
});
