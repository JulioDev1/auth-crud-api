import {
  Body,
  Controller,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guardian';
import { TeachersService } from './teachers.service';

@Controller('/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Put('/update-course')
  @UseGuards(AuthGuard)
  async createCourseName(
    @Body() name: string,
    @Query('id') id: number,
    @Request() req,
  ) {
    try {
      return await this.teachersService.updateCourseProf(
        name,
        req.user.email,
        id,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
