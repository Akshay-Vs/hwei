import { Tag, CreateTag, UpdateTag } from "@hwei/schema/dto/tags.schema";
import { BaseClient } from "./base";
import { AxiosInstance } from "axios";

export class TagClient extends BaseClient {
  constructor(getToken: () => Promise<string | null>, storeId: string, baseUrl?: string, api?: AxiosInstance) {
    super(
      getToken,
      `/tags`,
      baseUrl,
      api
    );
  }

  async getAllTags(search: string, skip: number, take: number): Promise<Tag[]> {
    return this.request(async () => this.api.get(`${this.route}?search=${search}&skip=${skip}&take=${take}`))
  }

  async getTag(id: string): Promise<Tag> {
    return this.request(async () => this.api.get(`${this.route}/${id}`))
  }

  async createTag(brand: CreateTag): Promise<Tag[]> {
    return this.request(async () => this.api.post(this.route, brand))
  }

  async updateTag(id: string, data: UpdateTag): Promise<Tag> {
    return this.request(async () => this.api.patch(`${this.route}/${id}`, data))
  }

  async deleteTag(id: string): Promise<void> {
    return this.request(async () => this.api.delete(`${this.route}/${id}`))
  }
}

