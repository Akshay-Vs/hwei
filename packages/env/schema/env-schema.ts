import { z } from 'zod';

// Define the environment schema
export const EnvSchema = z.object({
  // Node environment with a default and strict validation
  NODE_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),

  // Required URL for API
  API_URL: z.string().url('Invalid API URL'),

  // Database connection with specific validation
  DATABASE_URL: z.string().refine(
    (val) => /^mongodb(?:\+srv)?:\/\/(?:[a-zA-Z0-9-._~%]+(?::[a-zA-Z0-9-._~%]*)?@)?[a-zA-Z0-9-._~%]+(?:\:[0-9]+)?(?:\/[a-zA-Z0-9-._~%]*)?(?:\?[a-zA-Z0-9-._~%=&]*)?$/.test(val),
    { message: 'DATABASE_URL must be a valid MongoDB connection string' }
  ),

  // Feature flag with boolean parsing
  ENABLE_METRICS: z.string()
    .transform(val => ['true', '1', 'yes'].includes(val.toLowerCase())),

  // Sensitive API key with min length
  API_KEY: z.string().min(10, 'API key must be at least 10 characters'),

  // Optional configuration with a fallback
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug'])
    .default('info')
});