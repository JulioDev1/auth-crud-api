import { Course } from 'src/courses/entities/courses.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateTeacherDto {
  course?: string;
  user: User;
  courses?: Course[];
}
