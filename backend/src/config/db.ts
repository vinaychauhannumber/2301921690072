import { PrismaClient } from '@prisma/client';
import { Log } from 'logging-package';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

prisma.$use(async (params: any, next: (params: any) => Promise<any>) => {
  const start = Date.now();
  const result = await next(params);
  const duration = Date.now() - start;

  try {
    await Log('backend', 'info', 'db', `Prisma Query ${params.model}.${params.action} took ${duration}ms`);
  } catch (err) {
    // Fail silently per zero-console policy
  }

  return result;
});

export default prisma;
