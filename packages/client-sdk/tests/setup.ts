import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};

// Set default timeout
jest.setTimeout(10000);
