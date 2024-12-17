import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/courses.entity';
import { User } from '../../user/entities/user.entity';

@Entity('teacher')
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true })
  course: string;
  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];
}
