import env from '@hwei/env';

const config = env.loadEnv();

// Assign validated environment variables to process.env
Object.assign(process.env, config);

// Export validated environment variables for direct access to validted env object
export const validatedConfig = config;