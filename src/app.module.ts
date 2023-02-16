import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GrantsModule } from './grants/grants.module';
import { UsersModule } from './users/users.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { CheckGrantsModule } from './services/checkGrants/checkGrants.module';

@Module({
  imports: [
    GrantsModule,
    UsersModule,
    TaskListsModule,
    TasksModule,
    ConfigModule.forRoot(),
    PrismaModule,
    CheckGrantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
