import { Document } from "mongoose";

// Interface definitions
interface IClient extends Document {
  _id: string;
  userId: string;
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  grants: Array<"authorization_code" | "refresh_token">;
}

interface IAuthorizationCode extends Document {
  _id: string;
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope: string;
  clientId: string;
  userId: string;
}

interface IAccessToken extends Document {
  _id: string;
  accessToken: string;
  accessTokenExpiresAt: Date;
  scope: string;
  clientId: string;
  userId: string;
}

interface IRefreshToken extends Document {
  _id: string;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope: string;
  clientId: string;
  userId: string;
}

interface IUser {
  id: string;
  userId: string;
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  grants: string[];
}

interface IToken extends Document {
  _id: string;
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope: string;
  clientId: string;
  userId: string;
}


export type {
  IClient,
  IAuthorizationCode,
  IAccessToken,
  IRefreshToken,
  IUser,
  IToken
}