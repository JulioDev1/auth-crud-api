import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(user: UserDto): Promise<User> {
    const userExists = await this.userRepository.find({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const userCreated = await this.userRepository.create(user);

    return await this.userRepository.save(userCreated);
  }
}
