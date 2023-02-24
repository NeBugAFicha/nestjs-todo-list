import {
  Controller,
  Post,
  UsePipes,
  Headers,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import { JoiValidationPipe } from '../services/Validation';
import { Schema } from './users.schema';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Type } from './users.type';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('registration')
  @UsePipes(new JoiValidationPipe(Schema['registration']))
  async registration(
    @Headers('user_id') current_user_id: number,
    @Body() body: Type['registration']['body'],
  ) {
    let { login, password } = body;
    password = await bcrypt.hash(password, 3);

    const result = await this.usersService.create({ login, password });

    return { token: jwt.sign(result, process.env.JWT_SECRET_KEY) };
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(Schema['logIn']))
  async logIn(
    @Headers('user_id') current_user_id: number,
    @Body() body: Type['logIn']['body'],
  ) {
    const { login, password } = body;
    const result = await this.usersService.find({ login });

    const isPassEquals = await bcrypt.compare(password, result.password);

    if (!isPassEquals) {
      throw new ForbiddenException('Incorrect password');
    }
    const token = jwt.sign(result, process.env.JWT_SECRET_KEY);

    return { message: 'Valid credentials', token };
  }
}
