import { Course } from '../entities/courses.entity';

export interface ICourseService {
  CreateCourseTeacher(name: string, email: string): Promise<Course>;
}
