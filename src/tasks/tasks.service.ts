import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  findById(where: { id: number }) {
    return this.prisma.tasks.findFirst({ where });
  }

  create(fields: { name: string; task_list_id: number }) {
    return this.prisma.tasks.create({ data: fields });
  }

  delete(where: { id: number }) {
    return this.prisma.tasks.delete({ where });
  }

  update(where: { id: number }, fields: { name: string }) {
    return this.prisma.tasks.update({
      where,
      data: fields,
    });
  }
}
