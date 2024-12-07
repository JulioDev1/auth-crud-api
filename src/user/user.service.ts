import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: UserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    console.log(userExists);
    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const newUser = {
      ...user,
      password: await bcrypt.hash(
        user.password,
        Number(process.env.SALT_PASSWORD),
      ),
    };

    const userCreated = await this.userRepository.create(newUser);

    return await this.userRepository.save(userCreated);
  }

  async findUserById(email: string): Promise<User> {
    const findEmail = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!findEmail) {
      throw new NotFoundException(`email not found ${email}`);
    }

    return findEmail;
  }
}
