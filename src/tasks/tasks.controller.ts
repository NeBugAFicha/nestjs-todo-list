import {
  Controller,
  Get,
  UseGuards,
  UsePipes,
  Headers,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { Grants } from '../grants';
import { CheckGrantsService } from '../services/checkGrants/checkGrants.service';
import { AuthGuard } from '../services/Guard';
import { JoiValidationPipe } from '../services/Validation';
import { TasksService } from './tasks.service';
import { Type } from './tasks.type';
import { Schema } from './tssks.schema';

@Controller('task_list/:task_list_id')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(
    private readonly checkGrantsService: CheckGrantsService,
    private readonly tasksService: TasksService,
  ) {}

  @Get('task/:id(\\d+)')
  @UsePipes(new JoiValidationPipe(Schema['findById']))
  async findById(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['findById']['param'],
  ) {
    const { task_list_id, id } = param;

    await this.checkGrantsService.checkGrants({
      task_list_id,
      user_id: current_user_id,
      grants: [Grants.Read],
    });

    const result = await this.tasksService.findById({ id });

    return result;
  }

  @Post('task')
  @UsePipes(new JoiValidationPipe(Schema['create']))
  async create(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['create']['param'],
    @Body() body: Type['create']['body'],
  ) {
    const { task_list_id } = param;

    await this.checkGrantsService.checkGrants({
      task_list_id,
      user_id: current_user_id,
      grants: [Grants.Create],
    });

    const { name } = body;
    const result = await this.tasksService.create({ name, task_list_id });

    return result;
  }

  @Delete('task/:id(\\d+)')
  @UsePipes(new JoiValidationPipe(Schema['delete']))
  async delete(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['delete']['param'],
  ) {
    const { task_list_id, id } = param;

    await this.checkGrantsService.checkGrants({
      task_list_id,
      user_id: current_user_id,
      grants: [Grants.Delete],
    });

    const result = await this.tasksService.delete({ id });

    return result;
  }

  @Put('task/:id(\\d+)')
  @UsePipes(new JoiValidationPipe(Schema['update']))
  async update(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['update']['param'],
    @Body() body: Type['update']['body'],
  ) {
    const { task_list_id, id } = param;

    await this.checkGrantsService.checkGrants({
      task_list_id,
      user_id: current_user_id,
      grants: [Grants.Update],
    });

    const { name } = body;
    const result = await this.tasksService.update({ id }, { name });

    return result;
  }
}
