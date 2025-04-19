import { User } from '@clerk/backend';
import { Request as ExpressRequest } from 'express';

export interface Request extends ExpressRequest {
  user: User;
}
