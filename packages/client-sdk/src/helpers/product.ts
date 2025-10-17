import { AxiosInstance } from "axios";
import { BaseClient } from "./base";
import { Product, ProductInput, ProductUpdate } from "@hwei/schema/dto/products.schema";

export class ProductClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, storeId: string, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      `${storeId}/tags`,
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

  async createProduct(brand: ProductInput): Promise<Product> {
    return this.request(async () => this.api.post(this.route, brand))
  }

  async updateProduct(id: string, data: ProductUpdate): Promise<Product> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteProduct(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }

  async getProductAllImages(productid: string) { }
  async getProductImages(productId: string, imageId: string) { }

  async getAllProductVariants(productId: string) { }
  async getProductVariant(productId: string, variantId: string) { }

  async getAllProductCombinations(productId: string) { }
  async getProductCombination(productId: string, combinationId: string) { }

  async getProductVariantInventory(productId: string, variantId: string) { }
}
