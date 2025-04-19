import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';
import { Provider } from '@nestjs/common';

export const ClerkClientProvider: Provider = {
  provide: 'ClerkClient',
  useFactory: (configService: ConfigService) => {
    const publishableKey = configService.get<string>('CLERK_PUBLISHABLE_KEY');
    const secretKey = configService.get<string>('CLERK_SECRET_KEY');

    return createClerkClient({
      publishableKey,
      secretKey,
    });
  },
  inject: [ConfigService],
};
