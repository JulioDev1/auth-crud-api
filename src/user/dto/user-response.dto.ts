import { User } from '../entities/user.entity';

export class ResponseUserDto {
  name: string;

  email: string;

  password: string;
  constructor(user: Partial<User>) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
