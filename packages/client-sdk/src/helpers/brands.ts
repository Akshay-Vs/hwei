import { Brand, CreateBrand, UpdateBrand } from "@hwei/schema/dto/brands.schema"
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { getBaseUrl } from "@utils/base-url";
import { withErrorHandling } from "@utils/with-error-handling";
import { getHeaders } from "@/utils/headers";



export class BrandClient {
  private api: AxiosInstance;
  private route: string;

  constructor(getToken: () => Promise<string | null>, storeId: string, url?: string, api?: AxiosInstance) {
    const baseUrl = getBaseUrl(url);
    this.route = `${storeId}/brands`;

    this.api = api ?? axios.create({
      baseURL: baseUrl,
      headers: getHeaders()
    });

    this.api.interceptors.request.use(async (config) => {
      const token = await getToken();
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

  async getAllBrands(): Promise<Brand[]> {
    return this.request(async () => this.api.get(this.route))
  }

  async getBrand(id: string): Promise<Brand> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createBrand(store: CreateBrand): Promise<Brand> {
    return this.request(async () => this.api.post(this.route, store))
  }

  async updateBrand(id: string, data: UpdateBrand): Promise<Brand> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteBrand(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }
}

