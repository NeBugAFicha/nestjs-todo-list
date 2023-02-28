import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { GrantsModule } from './grants/grants.module';
import { CheckGrantsModule } from './services/checkGrants/checkGrants.module';
import { HttpExceptionFilter } from './services/Exceptions';
import { TransformInterceptor } from './services/Interceptor';
import { PrismaModule } from './services/prisma/prisma.module';
import { TaskListsModule } from './task-lists/task-lists.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GrantsModule,
    UsersModule,
    TaskListsModule,
    // RouterModule.register([
    //   {
    //     path: 'v1',
    //     module: TaskListsModule,
    //   },
    // ]),
    TasksModule,
    ConfigModule.forRoot(),
    PrismaModule,
    CheckGrantsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
