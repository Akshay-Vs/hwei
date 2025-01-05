import { v4 as uuid } from "uuid";
import { OAuthAuthorizationCodesModel } from "../models/oauth.js";

interface ICode {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope: string;
}

interface IClient {
  id: string;
}

interface IUser {
  _id: string;
}

async function saveAuthorizationCode(code: ICode, client: IClient, user: IUser) {
  const authorizationCode = {
    authorizationCode: code.authorizationCode,
    expiresAt: code.expiresAt,
    redirectUri: code.redirectUri,
    scope: code.scope,
    clientId: client.id,
    userId: user._id
  };

  await OAuthAuthorizationCodesModel.create({ _id: uuid(), ...authorizationCode });
  return authorizationCode;
}
export default saveAuthorizationCode