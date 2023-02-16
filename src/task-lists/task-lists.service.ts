import { Injectable } from '@nestjs/common';
import { Grants } from '../grants';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class TaskListsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(where: {
    user_id: number;
    grant_id?: Grants;
    NOT?: { grant_id: Grants };
  }) {
    return this.prisma.task_lists.findMany({
      where: {
        user_grant_task_lists: {
          some: where,
        },
      },
    });
  }

  findById(where: { id: number; user_id: number }) {
    const { id, user_id } = where;
    return this.prisma.task_lists.findFirstOrThrow({
      where: { id, user_grant_task_lists: { some: { user_id } } },
      include: {
        tasks: true,
        user_grant_task_lists: { select: { grants: true }, where: { user_id } },
      },
    });
  }

  create(fields: { user_id: number; name: string }) {
    const { user_id, name } = fields;
    return this.prisma.$transaction(async (tx) => {
      const task_list = await tx.task_lists.create({ data: { name } });
      return tx.user_grant_task_lists.create({
        data: {
          task_list_id: task_list.id,
          grant_id: Grants.Owner,
          user_id,
        },
      });
    });
  }

  delete(where: { id: number }) {
    return this.prisma.task_lists.delete({ where });
  }
}
