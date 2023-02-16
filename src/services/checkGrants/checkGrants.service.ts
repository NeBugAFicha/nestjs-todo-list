import { ForbiddenException, Injectable } from '@nestjs/common';
import { Grants } from '../../grants';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CheckGrantsService {
  constructor(private readonly prisma: PrismaService) {}

  async checkGrants(
    param: {
      user_id: number;
      task_list_id: number;
      grants: Grants[];
    },
    throwException = false,
  ) {
    const { user_id, task_list_id, grants } = param;
    const result = await this.prisma.user_grant_task_lists.findFirst({
      where: {
        user_id,
        grant_id: {
          in: grants,
        },
        task_list_id,
      },
    });

    if (!result && throwException) {
      throw new ForbiddenException(
        `No ${grants.map((grant) => Grants[grant]).join(' or ')} Grant or task list doesnt exist`,
      );
    }

    return result;
  }
}
