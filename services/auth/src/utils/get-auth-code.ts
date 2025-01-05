import { OAuthAuthorizationCodesModel } from "../models/oauth.js";

async function getAuthorizationCode(authorizationCode: string) {

  const code = await OAuthAuthorizationCodesModel.findOne({ authorizationCode }).lean();

  if (!code) throw new Error("Authorization code not found");

  return {
    code: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    scope: code.scope,
    client: { id: code.clientId },
    user: { id: code.userId }
  };
}

export default getAuthorizationCode;