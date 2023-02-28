import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Grants } from '../grants';
import { CheckGrantsService } from '../services/checkGrants/checkGrants.service';
import { AuthGuard } from '../services/Guard';
import { JoiValidationPipe } from '../services/Validation';
import { ControllerMethods } from '../Types';
import { Schema } from './task-lists.schema';
import { TaskListsService } from './task-lists.service';
import { Type } from './task-lists.type';

type Methods = ControllerMethods<Type>;

@Controller('task_list')
@UseGuards(AuthGuard)
export class TaskListsController implements Methods {
  constructor(
    private readonly checkGrantsService: CheckGrantsService,
    private readonly taskListService: TaskListsService,
  ) {}

  @Get()
  @UsePipes(new JoiValidationPipe(Schema['findAll']))
  async findAll(
    @Headers('user_id') current_user_id: number,
    @Query() query: Type['findAll']['query'],
  ) {
    const { my_list } = query;
    const grantCondition = my_list
      ? { grant_id: Grants.Owner }
      : { NOT: { grant_id: Grants.Owner } };

    const result = await this.taskListService.findAll({
      user_id: current_user_id,
      ...grantCondition,
    });
    return result;
  }

  @Get(':id(\\d+)')
  @UsePipes(new JoiValidationPipe(Schema['findById']))
  async findById(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['findById']['param'],
  ) {
    const { id } = param;

    const result = await this.taskListService.findById({
      id,
      user_id: current_user_id,
    });

    delete Object.assign(result, {
      grants: result.user_grant_task_lists.map(({ grants }) => grants),
    }).user_grant_task_lists;

    const checkOwnerReadGrant = await this.checkGrantsService.checkGrants({
      task_list_id: id,
      user_id: current_user_id,
      grants: [Grants.Owner, Grants.Read],
    });

    if (!checkOwnerReadGrant) {
      delete result.tasks;
    }

    return result;
  }

  @Post()
  @UsePipes(new JoiValidationPipe(Schema['create']))
  async create(
    @Headers('user_id') current_user_id: number,
    @Body() body: Type['create']['body'],
  ) {
    const { name } = body;
    const result = await this.taskListService.create({
      user_id: current_user_id,
      name,
    });

    return result;
  }

  @Delete(':id(\\d+)')
  @UsePipes(new JoiValidationPipe(Schema['delete']))
  async delete(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['delete']['param'],
  ) {
    const { id } = param;

    await this.checkGrantsService.checkGrants(
      {
        task_list_id: id,
        user_id: current_user_id,
        grants: [Grants.Owner],
      },
      true,
    );

    const result = await this.taskListService.delete({ id });

    return result;
  }

  @Get('list')
  @UsePipes(new JoiValidationPipe(Schema['findAllByList']))
  async findAllByList(
    @Headers('user_id') current_user_id: number,
    @Query() query: Type['findAllByList']['query'],
  ) {
    const { list_id } = query;

    const result = await this.taskListService.findAll({
      grant_id: list_id ? Grants.Read : Grants.Owner,
      user_id: list_id || current_user_id,
    });

    return result;
  }
}
