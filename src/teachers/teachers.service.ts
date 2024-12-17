import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacherFunction(user: User) {
    try {
      const teacher = this.teacherRepository.create({
        user: user,
      });

      return await this.teacherRepository.save(teacher);
    } catch (err) {
      console.log(err);
    }
  }
}
