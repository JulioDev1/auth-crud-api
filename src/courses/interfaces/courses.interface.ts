import { CourseDto } from '../dto/course.dto';
import { Course } from '../entities/courses.entity';

export interface ICourseService {
  CreateCourseTeacher(course: CourseDto): Promise<Course>;
}
