import { CreateBrand } from "@hwei/schema/dto/brands.schema";
import { CreateCategory } from "@hwei/schema/dto/categories.schema";
import { CreateCurrency } from "@hwei/schema/dto/currency.schema";
import { ProductTransactionInput as CreateProduct } from '@hwei/schema/dto/product-transaction';
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

export const mockProduct: CreateProduct = {
  metadata: {
    title: 'Test Product',
    description: 'Test Description',
    brandId: 'test-brand-id',
    categoryId: 'test-category-id',
    maxOrder: 10,
    minOrder: 1
  },
  images: [
    {
      imageUrl: TEST_CONFIG.assets.images.product1,
      imageAlt: 'Test Image',
      sortOrder: 1
    },
    {
      imageUrl: TEST_CONFIG.assets.images.product2,
      imageAlt: 'Test Image 2',
      sortOrder: 2
    },
    {
      imageUrl: TEST_CONFIG.assets.images.product3,
      imageAlt: 'Test Image 3',
      sortOrder: 3
    }
  ],
  variants: [
    {
      label: {
        name: "Color",
        sortOrder: 1,
        hasThumbnail: true
      },
      items: [
        {
          name: 'Test Product Orange',
          price: 100, currencyId: 'USD',
          sku: 'TEST-ORNG',
          stock: 10,
          sortOrder: 1,
          thumbnail: TEST_CONFIG.assets.images.thumbnail1,
        },
        {
          name: 'Test Product Red',
          price: 100,
          currencyId: 'USD',
          sku: 'TEST-RED',
          stock: 10,
          sortOrder: 2,
          thumbnail: TEST_CONFIG.assets.images.thumbnail2,
        }
      ],
    },
    {
      label: {
        name: "Size",
        sortOrder: 2,
        hasThumbnail: false
      },
      items: [
        {
          name: 'Test Product Small',
          price: 100,
          currencyId: 'USD',
          sku: 'TEST-SMALL',
          stock: 10,
          sortOrder: 1,
          thumbnail: null
        }
      ],
    }
  ]
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

export const createMockProduct = (overrides: Partial<CreateProduct> = {}) => ({
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
