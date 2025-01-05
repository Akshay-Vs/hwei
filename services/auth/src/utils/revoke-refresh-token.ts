import { OAuthAccessTokensModel } from "../models/oauth.js";

async function revokeRefreshToken({ refreshToken }: { refreshToken: string }) {
  const res = await OAuthAccessTokensModel.deleteOne({ refreshToken });
  return res.deletedCount === 1;
}

export default revokeRefreshToken;