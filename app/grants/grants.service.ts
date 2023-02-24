import { Injectable } from '@nestjs/common';
import { user_grant_task_lists } from '@prisma/client';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class GrantsService {
  constructor(private readonly prisma: PrismaService) {}

  create(fields: user_grant_task_lists) {
    return this.prisma.user_grant_task_lists.create({
      data: fields,
    });
  }

  delete(where: user_grant_task_lists) {
    return this.prisma.user_grant_task_lists.delete({
      where: {
        task_list_id_user_id_grant_id: where,
      },
    });
  }
}
