import './env'; // Validate and load environment variables

// Forward CLI arguments to Prisma
import { execSync } from 'child_process';
execSync(`npx prisma ${process.argv.slice(2).join(' ')}`, { stdio: 'inherit' });