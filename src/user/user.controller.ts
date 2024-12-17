import { Body, Controller, Post } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  async create(@Body() user: UserDto) {
    try {
      const createUser = await this.userService.create(user);
      return new ResponseUserDto(createUser);
    } catch (err) {
      throw new ExceptionsHandler(err.message);
    }
  }
}
