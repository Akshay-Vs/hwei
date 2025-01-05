import { z } from 'zod';
import dotenv from 'dotenv';
import path from 'path';
import log from 'npmlog';
import { EnvSchema } from '../schema/env-schema';

// Type for parsed environment
export type Env = z.infer<typeof EnvSchema>;

// Function to load and validate environment
export function loadEnv(envFile = '.env') {
  // Load environment from specific file (defaults to .env)
  // Root of the monorepo
  const envPath = path.resolve(__dirname, '../../../', envFile);
  dotenv.config({ path: envPath });
  log.info("ENV", 'Loaded environment from:', envPath);

  try {
    // Parse and validate environment variables
    const parsedEnv = EnvSchema.parse(process.env);
    log.info("ENV", Object.keys(parsedEnv).join(', \n'));

    return parsedEnv;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Detailed error formatting
      const formattedErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));

      log.error('Environment Validation Failed:', formattedErrors);
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

    log.info("ENV", 'Environment Configuration:');
    log.info("ENV", `- Node Env: ${env.NODE_ENV}`);
    log.info("ENV", `- API URL: ${env.API_URL}`);
    log.info("ENV", `- Metrics Enabled: ${env.ENABLE_METRICS}`);

    // Use validated environment variables
    // ... rest of your application initialization
  } catch (error) {
    log.error('App initialization failed:', error);
    process.exit(1);
  }
}

export default loadEnv
