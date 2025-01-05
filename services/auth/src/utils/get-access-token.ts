import { OAuthAccessTokensModel } from "../models/oauth.js";
import { IAccessToken } from "../types/0auth-types.js";

async function getAccessToken(accessToken: IAccessToken) {
  const token = await OAuthAccessTokensModel.findOne({ accessToken }).lean();

  if (!token) throw new Error("Access token not found");

  return {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    scope: token.scope,
    client: { id: token.clientId },
    user: { id: token.userId }
  };
}

export default getAccessToken;