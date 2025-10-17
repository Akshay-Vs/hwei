import { Currency, CreateCurrency, UpdateCurrency } from "@hwei/schema/dto/currency.schema";
import { BaseClient } from "./base";
import { AxiosInstance } from "axios";

export class CurrencyClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, storeId: string, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      `${storeId}/currency`,
      baseUrl,
      api
    );
  }

  async getAllCurrencys(search: string, skip: number, take: number): Promise<Currency[]> {
    return this.request(async () => this.api.get(`${this.route}?search?=${search}&skip=${skip}&take=${take}`))
  }

  async getCurrency(id: string): Promise<Currency> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createCurrency(brand: CreateCurrency): Promise<Currency> {
    return this.request(async () => this.api.post(this.route, brand))
  }

  async updateCurrency(id: string, data: UpdateCurrency): Promise<Currency> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteCurrency(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }
}

