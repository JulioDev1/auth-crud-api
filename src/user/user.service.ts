import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { TeachersService } from '../teachers/teachers.service';
import { TypeUser, UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private teacherService: TeachersService,
  ) {}

  async create(user: UserDto): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });

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

    const createdUser = await this.userRepository.create(newUser);

    const userCreated = await this.userRepository.save(createdUser);

    if (userCreated.typeUser === TypeUser.TEACHER) {
      await this.teacherService.createTeacherFunction(userCreated);
    }
    return createdUser;
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
