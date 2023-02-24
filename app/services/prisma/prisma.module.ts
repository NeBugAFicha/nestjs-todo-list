import { Global, Module } from '@nestjs/common';
import { IsDivisibleBy } from 'class-validator';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    // {
    //   provide: 'PrismaService',
    //   useFactory: async () => {
    //     const db = new PrismaService();
    //     await db.$connect();
    //     return db;
    //   },
    // },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
