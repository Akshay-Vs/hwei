import { ConfigService } from '@nestjs/config';
import { createClerkClient } from '@clerk/backend';
import { Provider } from '@nestjs/common';

export const ClerkClientProvider: Provider = {
  provide: 'ClerkClient',
  useFactory: (configService: ConfigService) => {
    return createClerkClient({
      publishableKey: configService.get('CLERK_PUBLISHABLE_KEY'),
      secretKey: configService.get('CLERK_SECRET_KEY'),
    });
  },
  inject: [ConfigService],
};
