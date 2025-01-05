import { OAuthClientsModel } from "../models/oauth.js";

interface ClientResponse {
  id: string;
  grants: Array<"authorization_code" | "refresh_token">;
  redirectUris: string[];
}

const getClient = async (
  clientId: string,
  clientSecret?: string
): Promise<ClientResponse> => {
  const client = await OAuthClientsModel.findOne({
    clientId,
    ...(clientSecret && { clientSecret })
  }).lean();

  if (!client) {
    throw new Error("Client not found");
  }

  return {
    id: client.clientId,
    grants: client.grants,
    redirectUris: [client.callbackUrl]
  };
};

export default getClient