import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeUser } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Course } from './entities/courses.entity';
import { ICourseService } from './interfaces/courses.interface';

@Injectable()
export class CoursesService implements ICourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private userService: UserService,
  ) {}
  async CreateCourseTeacher(name: string, email: string): Promise<Course> {
    const userFinded = await this.userService.findUserById(email);
    console.log('here' + userFinded.email);

    if (userFinded.typeUser != TypeUser.TEACHER) {
      throw new UnauthorizedException('Only teachers can create courses');
    }

    if (email == null) {
      throw new UnauthorizedException('email not passed');
    }

    const createCourse = await this.courseRepository.create({
      name: name,
      user: [userFinded],
    });
    console.log(createCourse.name);
    return createCourse;
  }
}
