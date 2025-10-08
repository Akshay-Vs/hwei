import { Store, CreateStore, UpdateStore } from "@hwei/schema/dto/store.schema";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getBaseUrl } from "@utils/base-url";
import { withErrorHandling } from "@utils/with-error-handling";



export class StoreClient {
  private api: AxiosInstance;

  constructor(getToken: () => string, url?: string, api?: AxiosInstance) {
    const baseUrl = getBaseUrl(url);

    this.api = api ?? axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    this.api.interceptors.request.use(async (config) => {
      const token = getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    })
  }

  private async request<T>(fn: () => Promise<AxiosResponse<T>>): Promise<T> {
    try {
      const { data } = await fn();
      return data;
    } catch (err) {
      return withErrorHandling(() => Promise.reject(err))();
    }
  }

  async getAllStores(): Promise<Store[]> {
    return this.request(async () => this.api.get("/stores"))
  }

  async getStore(id: string): Promise<Store> {
    return this.request(async () => this.api.get(`/stores/${id}`))
  }

  async createStore(store: CreateStore): Promise<Store> {
    return this.request(async () => this.api.post("/stores", store))
  }

  async updateStore(id: string, data: UpdateStore): Promise<Store> {
    return this.request(async () => this.api.put(`/stores/${id}`, data))
  }

  async deleteStore(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`/stores/${id}`))
  }
}

