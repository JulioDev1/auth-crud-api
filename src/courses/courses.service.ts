import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CourseDto } from './dto/course.dto';
import { Course } from './entities/courses.entity';
import { ICourseService } from './interfaces/courses.interface';

@Injectable()
export class CoursesService implements ICourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
    private userService: UserService,
  ) {}
  async CreateCourseTeacher(course: CourseDto): Promise<Course> {
    throw new Error();
  }
}
