import { getBaseUrl } from "@/utils/base-url";
import { getHeaders } from "@/utils/headers";
import { withErrorHandling } from "@/utils/with-error-handling";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export class BaseClient {
  protected api: AxiosInstance;
  protected route: string;

  constructor(getToken: () => Promise<string | null>, route: string, url?: string, api?: AxiosInstance) {
    const baseUrl = getBaseUrl(url);

    this.route = route;
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

  protected async request<T>(fn: () => Promise<AxiosResponse<T>>): Promise<T> {
    const safeFn = withErrorHandling(fn);
    const { data } = await safeFn();
    return data;
  }
}
