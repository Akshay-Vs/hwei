import { Brand, CreateBrand, UpdateBrand } from "@hwei/schema/dto/brands.schema"
import { AxiosInstance } from "axios";

import { BaseClient } from "./base";

export class BrandClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, storeId: string, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      `${storeId}/brands`,
      baseUrl,
      api
    );
  }

  async getAllBrands(): Promise<Brand[]> {
    return this.request(async () => this.api.get(this.route))
  }

  async getBrand(id: string): Promise<Brand> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createBrand(brand: CreateBrand): Promise<Brand> {
    return this.request(async () => this.api.post(this.route, brand))
  }

  async updateBrand(id: string, data: UpdateBrand): Promise<Brand> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteBrand(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }
}

