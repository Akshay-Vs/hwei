import { OAuthRefreshTokensModel } from "../models/oauth.js";
import { IRefreshToken } from "../types/0auth-types.js";

async function getRefreshToken(refreshToken: IRefreshToken) {
  const token = await OAuthRefreshTokensModel.findOne({ refreshToken }).lean();
  if (!token) throw new Error("Refresh token not found");

  return {
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    scope: token.scope,
    client: { id: token.clientId },
    user: { id: token.userId }
  };
}

export default getRefreshToken;