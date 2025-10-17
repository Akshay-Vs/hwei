import { CreateBrand } from "@hwei/schema/dto/brands.schema";
import { CreateCategory } from "@hwei/schema/dto/categories.schema";
import { CreateCurrency } from "@hwei/schema/dto/currency.schema";
import { CreateStore } from "@hwei/schema/dto/store.schema";
import { CreateTag } from "@hwei/schema/dto/tags.schema";
import { TEST_CONFIG } from "@tests/config/test.config";

export const mockBrand: CreateBrand = {
  name: 'Test Brand',
  description: 'Test Description',
  image: TEST_CONFIG.assets.images.default,
};

export const mockCategory: CreateCategory = {
  name: 'Test Category',
};

export const mockCurrency: CreateCurrency = {
  code: 'USD',
  label: 'US Dollar',
  symbol: '$',
};

export const mockProduct = {
  id: 'prod-123',
  name: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  sku: 'TEST-SKU-001',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockStore: CreateStore = {
  name: 'Test Store',
  version: 1,
  icon: 'Store',
};

export const mockTag: CreateTag = {
  names: ['Test Tag', 'Test Tag 2']
};

export const createMockBrand = (overrides: Partial<CreateBrand> = {}) => ({
  ...mockBrand,
  ...overrides,
});

export const createMockCategory = (overrides: Partial<CreateCategory> = {}) => ({
  ...mockCategory,
  ...overrides,
});

export const createMockCurrency = (overrides: Partial<CreateCurrency> = {}) => ({
  ...mockCurrency,
  ...overrides,
});

export const createMockProduct = (overrides = {}) => ({
  ...mockProduct,
  ...overrides,
});

export const createMockStore = (overrides: Partial<CreateStore> = {}) => ({
  ...mockStore,
  ...overrides,
});

export const createMockTag = (overrides: Partial<CreateTag> = {}) => ({
  ...mockTag,
  ...overrides,
});
