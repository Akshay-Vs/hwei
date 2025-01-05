import { v4 as uuid } from "uuid";
import { OAuthAccessTokensModel, OAuthRefreshTokensModel } from "../models/oauth.js";
import { IClient, IToken, IUser } from "../types/0auth-types.js";


async function saveRefreshToken(token: IToken, client: IClient, user: IUser) {

  await OAuthAccessTokensModel.create({
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    scope: token.scope,
    _id: uuid(),
    clientId: client.id,
    userId: user.id
  });


  if (token.refreshToken) {
    await OAuthRefreshTokensModel.create({
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      _id: uuid(),
      clientId: client.id,
      userId: user.id
    });
  }

  return {
    accessToken: token.accessToken,
    accessTokenExpiresAt: token.accessTokenExpiresAt,
    refreshToken: token.refreshToken,
    refreshTokenExpiresAt: token.refreshTokenExpiresAt,
    scope: token.scope,
    client: { id: client.id },
    user: { id: user.id },

    // other formats, i.e. for Zapier
    access_token: token.accessToken,
    refresh_token: token.refreshToken

  };

}