import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guardian';
import { CoursesService } from './courses.service';
import { CourseDto } from './dto/course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @UseGuards(AuthGuard)
  @Post('/create-course')
  async CreateCourseTeacher(
    @Body() name: string,
    @Request() req,
  ): Promise<CourseDto> {
    const courseCreate = await this.coursesService.CreateCourseTeacher(
      name,
      req.user.email,
    );
    return courseCreate;
  }
}
