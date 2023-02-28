import {
  Controller,
  Get,
  Headers,
  Param,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Grants } from '../grants';
import { CheckGrantsService } from '../services/checkGrants/checkGrants.service';
import { AuthGuard } from '../services/Guard';
import { JoiValidationPipe } from '../services/Validation';
import { ControllerMethods } from '../Types';
import { Schema } from './grants.schema';
import { GrantsService } from './grants.service';
import { Type } from './grants.type';

type Methods = ControllerMethods<Type>;

@Controller('/task_list/:task_list_id')
@UseGuards(AuthGuard)
export class GrantsController implements Methods {
  constructor(
    private readonly grantsService: GrantsService,
    private readonly checkGrantService: CheckGrantsService,
  ) {}

  @Get('grant')
  @UsePipes(new JoiValidationPipe(Schema['grant']))
  async grant(
    @Headers('user_id') current_user_id: number,
    @Param() param: Type['grant']['param'],
    @Query() query: Type['grant']['query'],
  ) {
    const { task_list_id } = param;
    const { grant, user_id, take_off } = query;
    await this.checkGrantService.checkGrants(
      {
        user_id: current_user_id,
        task_list_id,
        grants: [Grants.Owner],
      },
      true,
    );

    let result;
    if (take_off) {
      result = await this.grantsService.delete({
        user_id,
        task_list_id,
        grant_id: Grants[grant],
      });
    } else {
      result = await this.grantsService.create({
        user_id,
        task_list_id,
        grant_id: Grants[grant],
      });
    }

    return result;
  }
}
