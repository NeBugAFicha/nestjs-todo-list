import { Injectable } from '@nestjs/common';
import { PrismaService } from '../services/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(fields: { login: string; password: string }) {
    return this.prisma.users.create({
      data: fields,
    });
  }

  find(where: { login: string }) {
    return this.prisma.users.findFirst({ where });
  }
}
