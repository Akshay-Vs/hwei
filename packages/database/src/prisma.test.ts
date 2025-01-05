import './env'; // This ensures `process.env` is populated with the validated envs
import { PrismaClient } from '@prisma/client';

// Initialize Prisma
const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (error) {
    console.error('Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
})();