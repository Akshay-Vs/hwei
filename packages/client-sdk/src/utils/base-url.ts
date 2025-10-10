import { ConfigurationError } from "@errors/configuration-error";

export const getBaseUrl = (url?: string): string => {
  let baseUrl = url || process.env.HWEI_BASE_URL || process.env.NEXT_PUBLIC_HWEI_BASE_URL;
  const version = process.env.HWEI_VERSION || process.env.NEXT_PUBLIC_HWEI_VERSION;

  if (!baseUrl) throw new ConfigurationError("HWEI_BASE_URL is not set", "E_MISSING_KEY");
  if (!version) throw new ConfigurationError("HWEI_VERSION is not set", "E_MISSING_KEY");
  if (baseUrl.endsWith("/")) baseUrl = baseUrl.slice(0, -1);

  return baseUrl.concat(`/v${version}`);
}
