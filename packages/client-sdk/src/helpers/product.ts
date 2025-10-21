import { AxiosInstance } from "axios";
import { BaseClient } from "./base";
import { Product, ProductUpdate } from "@hwei/schema/dto/products.schema";
import { ProductTransactionInput as CreateProduct } from "@hwei/schema/dto/product-transaction";
export class ProductClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, storeId: string, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      `${storeId}/products`,
      baseUrl,
      api
    );
  }
  async getAllProducts(search: string, skip: number, take: number): Promise<Product[]> {
    return this.request(async () => this.api.get(`${this.route}?search?=${search}&skip=${skip}&take=${take}`))
  }

  async getProduct(id: string): Promise<Product> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createProduct(brand: CreateProduct): Promise<Product> {
    return this.request(async () => this.api.post(this.route, brand))
  }

  async updateProduct(id: string, data: ProductUpdate): Promise<Product> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteProduct(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }

  async getProductAllImages(productId: string) {
    return this.request(async () => this.api.get(`${this.route}/images/${productId}`))
  }
  async getProductImages(productId: string, imageId: string) {
    return this.request(async () => this.api.get(`${this.route}/images/${productId}/${imageId}`))
  }

  async getAllProductVariantLabels(productId: string) {
    return this.request(async () =>
      this.api.get(`${this.route}/${productId}/variants/label`))
  }
  async getProductVariantLabel(productId: string, labelId: string) {
    return this.request(async () =>
      this.api.get(`${this.route}/${productId}/variants/label/${labelId}`))
  }

  async getAllProductCombinations(productId: string) {
    return this.request(async () =>
      this.api.get(`${this.route}/${productId}/variants/combination`))
  }
  async getProductCombination(productId: string, combinationId: string) {
    return this.request(async () =>
      this.api.get(`${this.route}/${productId}/variants/combination/${combinationId}`))
  }

  async getProductVariantInventory(productId: string, combinationId: string, inventoryId: string) {
    return this.request(async () =>
      this.api.get(`${this.route}/${productId}/variants/inventory/${combinationId}/${inventoryId}`))
  }
}
