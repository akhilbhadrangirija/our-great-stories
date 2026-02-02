import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const prismaClientSingleton = () => {
        const adapter = new PrismaLibSql({
                url: process.env.DATABASE_URL,
                authToken: process.env.TURSO_AUTH_TOKEN,
        });
        return new PrismaClient({ adapter });
};

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
