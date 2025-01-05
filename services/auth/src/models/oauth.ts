import mongoose, { Document, Model, Schema } from "mongoose";
import { IAccessToken, IAuthorizationCode, IClient, IRefreshToken } from "../types/0auth-types.js";

// Schema definitions
const clientSchema = new Schema<IClient>({
  _id: { type: String, auto: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true },
  clientSecret: { type: String, required: true },
  callbackUrl: { type: String, required: true },
  grants: {
    type: [String],
    required: true,
    enum: ["authorization_code", "refresh_token"]
  }
});

const authorizationCodeSchema = new Schema<IAuthorizationCode>({
  _id: { type: String, auto: true },
  authorizationCode: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  redirectUri: { type: String, required: true },
  scope: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true }
});

const accessTokenSchema = new Schema<IAccessToken>({
  _id: { type: String, required: true },
  accessToken: { type: String, required: true },
  accessTokenExpiresAt: { type: Date, required: true },
  scope: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true }
});

const refreshTokenSchema = new Schema<IRefreshToken>({
  _id: { type: String, required: true },
  refreshToken: { type: String, required: true },
  refreshTokenExpiresAt: { type: Date, required: true },
  scope: { type: String, required: true },
  clientId: { type: String, required: true },
  userId: { type: String, required: true }
});

// Model definitions with proper typing
const OAuthClientsModel = mongoose.model<IClient>("OAuthClients", clientSchema, "oauth-clients");
const OAuthAuthorizationCodesModel = mongoose.model<IAuthorizationCode>("OAuthAuthorizationCodes", authorizationCodeSchema, "oauth-authorization-codes");
const OAuthAccessTokensModel = mongoose.model<IAccessToken>("OAuthAccessTokens", accessTokenSchema, "oauth-access-tokens");
const OAuthRefreshTokensModel = mongoose.model<IRefreshToken>("OAuthRefreshTokens", refreshTokenSchema, "oauth-refresh-tokens");

export {
  OAuthClientsModel,
  OAuthAuthorizationCodesModel,
  OAuthAccessTokensModel,
  OAuthRefreshTokensModel,
};