import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { IAuthInterface } from './interface/IAuthInterface';

import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService implements IAuthInterface {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async SignIn(user: AuthDto): Promise<{ acessToken: string }> {
    const findedUser = await this.userService.findUserById(user.email);

    const verifyPassword = bcrypt.compare(user.password, findedUser.password);

    if (!verifyPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: findedUser.id, email: findedUser.email };

    return {
      acessToken: await this.jwtService.signAsync(payload),
    };
  }
}
