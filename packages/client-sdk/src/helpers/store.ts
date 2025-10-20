import { Store, CreateStore, UpdateStore } from "@hwei/schema/dto/store.schema";
import { AxiosInstance } from "axios";
import { BaseClient } from "./base";

export class StoreClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      '/stores',
      baseUrl,
      api
    );
  }

  async getAllStores(): Promise<Store[]> {
    return this.request(async () => this.api.get(this.route))
  }

  async getStore(id: string): Promise<Store> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createStore(store: CreateStore): Promise<Store> {
    return this.request(async () => this.api.post(this.route, store))
  }

  async updateStore(id: string, data: UpdateStore): Promise<Store> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteStore(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }
}

