import { Category, CreateCategory, UpdateCategory } from "@hwei/schema/dto/categories.schema";
import { BaseClient } from "./base";
import { AxiosInstance } from "axios";

export class CategoryClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, storeId: string, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      `${storeId}/categories`,
      baseUrl,
      api
    );
  }

  async getAllCategories(): Promise<Category[]> {
    return this.request(async () => this.api.get(this.route))
  }

  async getCategory(id: string): Promise<Category> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createCategory(brand: CreateCategory): Promise<Category> {
    return this.request(async () => this.api.post(this.route, brand))
  }

  async updateCategory(id: string, data: UpdateCategory): Promise<Category> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteCategory(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }
}
