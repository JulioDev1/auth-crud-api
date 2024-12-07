import { Body, Controller, Post } from '@nestjs/common';
import { ResponseUserDto } from './dto/user-response.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create')
  async create(@Body() user: UserDto) {
    const createUser = await this.userService.create(user);
    return new ResponseUserDto(createUser);
  }
}
