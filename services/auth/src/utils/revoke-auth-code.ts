import { OAuthAuthorizationCodesModel } from "../models/oauth.js";

async function revokeAuthorizationCode({ code }: { code: string }) {
  const res = await OAuthAuthorizationCodesModel.deleteOne({ authorizationCode: code });
  return res.deletedCount === 1;
}

export default revokeAuthorizationCode;