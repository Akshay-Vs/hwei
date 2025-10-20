import { ConfigurationError } from '@/errors/configuration-error';
import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

export const createMockAxios = (): { api: AxiosInstance; mock: MockAdapter } => {
  const api = axios.create();
  const mock = new MockAdapter(api);
  return { api, mock };
};

export const mockGetToken = async (): Promise<string | null> => {
  const token = process.env.HWEI_TOKEN;

  if (!token) {
    throw new ConfigurationError('No token found in environment variables', 'E_MISSING_KEY');
  }

  return token;
};

export const mockGetTokenNull = async (): Promise<string | null> => {
  return null;
};

export const mockGetTokenRejected = async (): Promise<string | null> => {
  throw new Error('Token fetch failed');
};

export const expectUnauthorizedError = (error: any) => {
  expect(error).toBeDefined();
  expect(error.response?.status).toBe(401);
};

export const expectBadRequestError = (error: any) => {
  expect(error).toBeDefined();
  expect(error.response?.status).toBe(400);
};

export const expectNotFoundError = (error: any) => {
  expect(error).toBeDefined();
  expect(error.response?.status).toBe(404);
};

export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
