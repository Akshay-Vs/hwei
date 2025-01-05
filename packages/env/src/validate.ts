import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';

import { EnvSchema } from '../schema/env-schema';

// Type for parsed environment
export type Env = z.infer<typeof EnvSchema>;

// Function to load and validate environment
export function loadEnv(envFile = '.env') {
  // Load environment from specific file (defaults to .env)
  // Root of the monorepo
  const envPath = path.resolve(__dirname, '../../../', envFile);
  dotenv.config({ path: envPath });

  try {
    // Parse and validate environment variables
    const parsedEnv = EnvSchema.parse(process.env);
    console.log(parsedEnv);
    return parsedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Detailed error formatting
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));

      console.error('Environment Validation Failed:', formattedErrors);
      throw new Error('Invalid environment configuration');
    }
    throw error;
  }
}

// Example usage in an application
export function initializeApp() {
  try {
    // Load and validate environment
    const env = loadEnv();

    console.log('Environment Configuration:');
    console.log(`- Node Env: ${env.NODE_ENV}`);
    console.log(`- API URL: ${env.API_URL}`);
    console.log(`- Metrics Enabled: ${env.ENABLE_METRICS}`);

    // Use validated environment variables
    // ... rest of your application initialization
  } catch (error) {
    console.error('App initialization failed:', error);
    process.exit(1);
  }
}

export default loadEnv
