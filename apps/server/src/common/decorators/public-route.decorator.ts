import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

export const PublicRoute = (): CustomDecorator<typeof IS_PUBLIC_KEY> =>
  SetMetadata(IS_PUBLIC_KEY, true);
